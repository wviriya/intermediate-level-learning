# Google Drive Integration Troubleshooting

If lessons aren't loading from Google Drive, follow this guide.

## ✅ Checklist

### 1. Verify Folder Structure

Your Google Drive folder MUST have this structure:

```
Learning Hub Content/ (1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8)
├── science/
│   ├── y7/
│   │   └── lesson_*.json
│   ├── y8/
│   │   └── lesson_*.json
│   └── y9/
│       └── lesson_*.json
├── math/
│   ├── y7/
│   ├── y8/
│   └── y9/
├── english/
│   ├── y7/
│   ├── y8/
│   └── y9/
└── social-science/
    ├── y7/
    ├── y8/
    └── y9/
```

**Create the folders if missing:**
1. Go to your Google Drive folder
2. Create folders for each subject
3. Inside each subject, create y7, y8, y9 folders

### 2. Check API Key

Verify your `.env` file has the correct API key:

```bash
cat .env | grep GOOGLE_DRIVE_API_KEY
```

Should output:
```
REACT_APP_GOOGLE_DRIVE_API_KEY=AIzaSyA9kqgH0kLIH1sIGLBzyJqEVZctr9BBsig
```

### 3. Check Browser Console

1. Open app: http://localhost:3000
2. Open DevTools (F12)
3. Go to Console tab
4. Look for errors starting with "Google" or "Drive"

### 4. Verify Google API Loading

In Console, run:
```javascript
window.gapi
```

Should show Google API object (not undefined)

## 🔧 Common Issues & Fixes

### Issue: "Google API not loaded"

**Fix:**
1. Make sure `public/index.html` has:
   ```html
   <script src="https://apis.google.com/js/api.js"></script>
   ```
2. Hard refresh browser (Ctrl+Shift+R)
3. Check internet connection

### Issue: "Error finding folder: science"

**Means:** Folder doesn't exist or has different name

**Fix:**
1. Go to Google Drive
2. Verify folder names are lowercase: `science`, `math`, `english`, `social-science`
3. Check that folders are directly inside the main folder

### Issue: "Error listing files"

**Means:** Permissions issue or API error

**Fix:**
1. Verify API key in `.env`
2. Check folder is shared publicly or with your account
3. Make sure you're logged into the correct Google account
4. Restart the app

### Issue: "No lessons found"

**Means:** JSON files not in folder, or folder structure wrong

**Fix:**
1. Upload test JSON file:
   ```json
   {
     "id": "test",
     "week": 1,
     "title": "Test",
     "subject": "science",
     "level": "y8",
     "icon": "📚",
     "color": "bg-blue-100",
     "textColor": "text-blue-700",
     "difficulty": "easy",
     "introduction": "Test",
     "sections": [],
     "diagram": "test",
     "flashcards": [],
     "quiz": [],
     "cheatsheet": {}
   }
   ```
2. Place in: `science/y8/test.json`
3. Refresh app
4. Check if "Test" lesson appears

### Issue: "CORS error" in console

**Means:** Browser blocking cross-domain API calls

**Fix:**
1. This is normal for development
2. API should still work (check if lessons load)
3. In production, CORS shouldn't be an issue

### Issue: Lessons load from local but not Google Drive

**Means:** App is falling back to local `public/content/` files

**Fix:**
1. Check `.env` file exists and has API key
2. Verify Google API loads (check console)
3. Check folder names match exactly
4. Try uploading a lesson to Google Drive
5. Refresh browser

## 📝 How to Upload Your First Lesson

1. **Create a JSON file** (use template from CONTENT_GUIDE.md)
2. **Save as**: `lesson_1_respiration.json`
3. **Upload to**: Google Drive → science → y8 → lesson_1_respiration.json
4. **Go to app** and refresh
5. **Select**: Science → Y8
6. **See**: Your lesson appears!

## 🔍 Debug Mode

Add this to your `.env` to enable debug logging:

```
REACT_APP_DEBUG_GOOGLE_DRIVE=true
```

Then check console for detailed logs.

## 📊 Test Your Connection

Run this in browser console:

```javascript
// Test if Google API is loaded
console.log('Google API loaded:', !!window.gapi);

// Test if API key is correct (will show in network tab)
fetch('https://www.googleapis.com/drive/v3/files?key=AIzaSyA9kqgH0kLIH1sIGLBzyJqEVZctr9BBsig')
  .then(r => r.json())
  .then(data => console.log('API working:', !!data.files))
  .catch(e => console.error('API error:', e));
```

## 🚀 To Fully Enable Google Drive Integration

1. ✅ Verify folder structure exists
2. ✅ Upload test JSON to science/y8/
3. ✅ Check `.env` has correct API key
4. ✅ Hard refresh browser
5. ✅ See lessons appear in app

## 💡 Pro Tips

- **Batch Upload**: Upload multiple lessons at once
- **Test First**: Upload 1 lesson, verify it works, then upload more
- **Version Numbers**: Use naming like `lesson_1_topic.json` for clarity
- **Check Spelling**: Lesson IDs must be unique
- **Keep JSONs Valid**: Use jsonlint.com to validate before uploading

## 🆘 Still Not Working?

1. Check browser console for specific errors
2. Verify API key is correct (copy-paste from .env)
3. Verify folder structure is exactly right
4. Make sure `.env` file exists (run `bash setup-env.sh`)
5. Try uploading a simple test JSON first
6. Hard refresh browser (Ctrl+Shift+R)

If still stuck, check these files:
- `src/utils/googleDriveClient.js` - Should load Google API
- `public/index.html` - Should have Google API script
- `.env` - Should have API_KEY and FOLDER_ID
