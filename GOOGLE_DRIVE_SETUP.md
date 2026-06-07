# Google Drive Integration Setup

Your Learning Hub app is now integrated with Google Drive for managing and syncing learning content.

## Overview

The Google Drive integration allows you to:
- Store all lesson content in Google Drive
- Keep content synced between the app and Google Drive
- Share content with team members
- Version control lessons
- Collaborate on content creation

## Setup Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project: **Learning Hub Content**
3. Enable these APIs:
   - Google Drive API
   - Google Docs API
4. Create credentials (see Step 2 for which type)

### Step 2: Set Up Google Drive Folder

1. Create a folder in Google Drive: **Learning Hub Content**
2. Note the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Share the folder with your team members
4. Create subfolders for each subject:
   - `science/` → y7, y8, y9
   - `math/` → y7, y8, y9
   - `english/` → y7, y8, y9
   - `social-science/` → y7, y8, y9

### Step 3: Google Doc for Schema

Your schema is stored in this Google Doc:
**Link**: https://docs.google.com/document/d/1jUorTwmnCBl1uTXzWQ2zuLTvtwrX9CBo_0F0K9Q8TAw/edit

This document serves as:
- Single source of truth for lesson structure
- Reference for content creators
- Version history of schema changes

### Step 4: Create API Key (Public - Read Only)

1. In Google Cloud Console → Credentials
2. Click **Create Credentials** → **API Key**
3. Restrict key to:
   - Google Drive API
   - HTTP referrers (add your domain)
4. Copy the key

### Step 5: Create Service Account (Private - Write Access)

For admin/teacher operations (saving lessons):

1. In Google Cloud Console → Credentials
2. Click **Create Service Account**
3. Name: `learning-hub-service`
4. Grant roles:
   - Editor (for Google Drive)
5. Create JSON key
6. Download and save securely

### Step 6: Environment Variables

Create a `.env` file in your project root:

```bash
# Public API Key (for students reading lessons)
REACT_APP_GOOGLE_DRIVE_API_KEY=AIzaSyD...

# Service Account (for admins saving lessons)
# Store this server-side only, never in frontend
GOOGLE_SERVICE_ACCOUNT_EMAIL=learning-hub@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY={"type": "service_account", "project_id": "..."}

# Folder IDs
REACT_APP_GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
REACT_APP_GOOGLE_DOCS_ID=1jUorTwmnCBl1uTXzWQ2zuLTvtwrX9CBo_0F0K9Q8TAw
```

**Never commit `.env` to GitHub!**

### Step 7: Add to `.gitignore`

```
.env
.env.local
.env.*.local
service-account-key.json
```

### Step 8: Update App Configuration

Edit `src/utils/googleDriveSync.js`:

```javascript
const GOOGLE_DRIVE_API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
const GOOGLE_DRIVE_FOLDER_ID = process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID;
const GOOGLE_DOCS_ID = process.env.REACT_APP_GOOGLE_DOCS_ID;
```

### Step 9: Add Google API Script

In `public/index.html`, add before closing `</head>`:

```html
<script src="https://apis.google.com/js/api.js"></script>
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

## Authentication Architecture

### Two-Layer Security

**Layer 1: Public API Key (Students)**
- Read-only access to lessons
- No credentials needed
- Fast, cached retrieval
- Suitable for frontend

**Layer 2: Service Account (Teachers/Admins)**
- Full read/write access
- Secure server-side authentication
- Used for syncing and uploading
- Protected from exposure

```
Students
    ↓
Public API Key (read only)
    ↓
Fetch lessons from Google Drive
    ↓
Display in app

Teachers/Admins
    ↓
Service Account (secure, server-side)
    ↓
Create/edit/sync lessons
    ↓
Save to Google Drive
```

## How It Works

### Content Storage Structure

```
Google Drive/
├── Learning Hub Content/
│   ├── science/
│   │   ├── y7/
│   │   │   ├── lesson_1_cells.json
│   │   │   ├── lesson_2_photosynthesis.json
│   │   ├── y8/
│   │   │   ├── lesson_1_respiration.json
│   │   │   ├── lesson_2_digestion.json
│   │   └── y9/
│   ├── math/
│   │   ├── y7/
│   │   ├── y8/
│   │   └── y9/
│   ├── schema.md (in Google Doc)
│   └── metadata.json (index of all lessons)
```

### Sync Flow

```
Create/Edit Lesson
    ↓
Validate (via googleDriveSync.validateLessonStructure)
    ↓
Save to Google Drive (via googleDriveSync.saveLessonToGoogleDrive)
    ↓
Update local cache
    ↓
App fetches and displays
```

## Usage in Components

### Fetch a Lesson

```javascript
import { fetchLessonFromGoogleDrive } from './utils/googleDriveSync';

const lesson = await fetchLessonFromGoogleDrive('science', 'y8', 'lesson_1_respiration');
```

### Fetch All Lessons

```javascript
import { fetchAllLessonsFromGoogleDrive } from './utils/googleDriveSync';

const allLessons = await fetchAllLessonsFromGoogleDrive();
```

### Save a Lesson

```javascript
import { saveLessonToGoogleDrive } from './utils/googleDriveSync';

const lesson = {
  id: 'new_lesson',
  title: 'New Lesson',
  // ... other fields
};

await saveLessonToGoogleDrive('science', 'y8', lesson);
```

### Validate Lesson Structure

```javascript
import { validateLessonStructure } from './utils/googleDriveSync';

try {
  validateLessonStructure(lesson);
  console.log('Lesson is valid!');
} catch (error) {
  console.error('Lesson validation failed:', error);
}
```

### Get Lesson Statistics

```javascript
import { getLessonStatistics } from './utils/googleDriveSync';

const stats = await getLessonStatistics();
console.log(`Total lessons: ${stats.totalLessons}`);
console.log(`By subject:`, stats.bySubject);
```

### Export and Import Lessons

```javascript
import { exportLessonAsJSON, importLessonFromJSON } from './utils/googleDriveSync';

// Export
const jsonString = exportLessonAsJSON(lesson);
console.log(jsonString); // Print to backup

// Import
const imported = importLessonFromJSON(jsonString);
```

## Content Workflow for Teachers

### Creating a New Lesson

1. **Use AI Curation** (recommended)
   - Follow `AI_PROMPTS.md`
   - Let AI generate JSON
   - Validate with schema

2. **Manual Creation**
   - Copy the schema from Google Doc
   - Fill in all required fields
   - Save locally first
   - Validate using the app

3. **Upload to Google Drive**
   - Save JSON file to appropriate subject/level folder
   - Run sync function to update app
   - Test in the app

### Editing Existing Lessons

1. Download lesson JSON from Google Drive
2. Edit locally or in Google Drive (convert to Google Sheet)
3. Save changes
4. Run sync to update app
5. Test changes

### Collaborating with Team

1. Grant Google Drive folder access to team members
2. Each person creates/edits lessons in their folder
3. Daily sync pulls all changes
4. Merge conflicts resolved manually

## Best Practices

### File Naming
- Use descriptive names: `lesson_1_respiration.json`
- Include topic: `lesson_2_photosynthesis.json`
- Use underscores, not spaces
- Lowercase only

### Version Control
- Keep schema version in Google Doc
- Track schema changes in version history
- Archive old lesson versions
- Date old versions: `lesson_1_respiration_2024_01.json`

### Quality Assurance
- Always validate before uploading
- Test lessons in the app after sync
- Have peer review lesson content
- Check for spelling/accuracy

### Performance
- Don't sync more than once per hour
- Cache lessons locally
- Compress large media files
- Batch sync operations

## Troubleshooting

### Issue: Google Drive not loading

**Solution:**
- Check API key in `.env`
- Verify Google Cloud project setup
- Check browser console for errors
- Ensure Google APIs are loaded

### Issue: Lesson validation fails

**Solution:**
- Check against schema in Google Doc
- Ensure all required fields present
- Validate JSON syntax (use jsonlint.com)
- Check field types match schema

### Issue: Sync not updating app

**Solution:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check localStorage
- Try manual sync function

### Issue: Permission denied errors

**Solution:**
- Check Google Drive folder permissions
- Verify API credentials
- Check OAuth token expiration
- Re-authenticate

## Advanced: Custom Google Drive Implementation

### Option 1: Google Sheets

Store lessons in Google Sheets for easier collaboration:

```javascript
// Would fetch from Google Sheets API
export const fetchLessonFromGoogleSheets = async (sheetId, range) => {
  // Implementation here
};
```

### Option 2: Google Firebase

Use Firebase Real-time Database for live sync:

```javascript
import { database } from 'firebase/app';

export const syncWithFirebase = async (lesson) => {
  // Implementation here
};
```

### Option 3: Custom Web Dashboard

Create an admin panel for lesson management:

```javascript
// Admin dashboard for creating/editing lessons
// Would upload directly to Google Drive
// Shows sync status
// Manages versioning
```

## Security Considerations

- **Never commit API keys** - Use `.env` and `.gitignore`
- **Scope OAuth permissions** - Only request needed scopes
- **Validate all input** - Sanitize before saving
- **Encrypt sensitive data** - Use HTTPS
- **Audit access** - Log who accessed/modified content
- **Rate limiting** - Prevent API abuse
- **Backup content** - Regular exports to GitHub

## Monitoring & Analytics

Track content usage:

```javascript
// Track lesson access
const trackLessonAccess = (lessonId, userId) => {
  // Send to Google Analytics
};

// Track sync success/failures
const trackSyncStatus = (result) => {
  // Log to Firebase or database
};
```

## Future Enhancements

- [ ] Real-time collaboration (multiple editors)
- [ ] AI-powered content suggestions
- [ ] Automatic plagiarism checking
- [ ] Content translation support
- [ ] Accessibility audit automation
- [ ] Student feedback integration
- [ ] A/B testing lessons
- [ ] Content performance analytics

## Support

- **Schema Questions**: Check the Google Doc
- **API Issues**: See Google Drive API docs
- **Content Creation**: See `AI_PROMPTS.md` and `CONTENT_GUIDE.md`
- **Integration Help**: Check `googleDriveSync.js` comments

---

**Your schema is ready!** Start creating lessons and they'll sync to Google Drive automatically.
