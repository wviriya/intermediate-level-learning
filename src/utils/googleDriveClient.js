const FOLDER_ID = '1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8';

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

const api = async (params) => {
  const url = new URL('/api/drive', API_BASE || window.location.origin);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  return res.json();
};

export const loadGoogleAPI = async () => {
  // Verify the backend is reachable and service account works
  await api({ action: 'getFolderId', name: 'math', parent: FOLDER_ID });
  console.log('✓ Drive API ready via service account');
  return true;
};

export const getFolderId = async (folderName, parentFolderId = FOLDER_ID) => {
  try {
    const data = await api({ action: 'getFolderId', name: folderName, parent: parentFolderId });
    return data.id || null;
  } catch (err) {
    console.warn(`getFolderId(${folderName}):`, err.message);
    return null;
  }
};

export const listFilesInFolder = async (folderId) => {
  try {
    const data = await api({ action: 'listFiles', folderId });
    return data.files || [];
  } catch (err) {
    console.warn(`listFilesInFolder(${folderId}):`, err.message);
    return [];
  }
};

export const getFileContent = async (fileId) => {
  try {
    return await api({ action: 'getFile', fileId });
  } catch (err) {
    console.warn(`getFileContent(${fileId}):`, err.message);
    return null;
  }
};

export const getLessonsBySubjectAndLevel = async (subject, level) => {
  try {
    const subjectFolderId = await getFolderId(subject, FOLDER_ID);
    if (!subjectFolderId) {
      console.warn(`Subject folder not found: ${subject}`);
      return [];
    }

    const levelFolderId = await getFolderId(level, subjectFolderId);
    if (!levelFolderId) {
      console.warn(`Level folder not found: ${level} under ${subject}`);
      return [];
    }

    const files = await listFilesInFolder(levelFolderId);
    console.log(`Files in ${subject}/${level}:`, files.map(f => f.name));

    const jsonFiles = files.filter(f => f.name.endsWith('.json'));

    const lessons = [];
    for (const file of jsonFiles) {
      console.log(`Loading ${file.name}...`);
      const content = await getFileContent(file.id);
      if (content) {
        lessons.push({ ...content, googleDriveId: file.id, googleDriveLink: file.webViewLink });
      }
    }

    console.log(`✓ Loaded ${lessons.length} lessons from Drive for ${subject}/${level}`);
    return lessons.sort((a, b) => a.week - b.week);
  } catch (err) {
    console.error('getLessonsBySubjectAndLevel:', err);
    return [];
  }
};

export const getAvailableSubjects = async () => {
  try {
    const files = await listFilesInFolder(FOLDER_ID);
    return files.filter(f => f.mimeType === 'application/vnd.google-apps.folder').map(f => f.name).sort();
  } catch (err) {
    console.warn('getAvailableSubjects:', err.message);
    return [];
  }
};

export const getAvailableLevels = async (subject) => {
  try {
    const subjectFolderId = await getFolderId(subject, FOLDER_ID);
    if (!subjectFolderId) return [];
    const files = await listFilesInFolder(subjectFolderId);
    return files.filter(f => f.mimeType === 'application/vnd.google-apps.folder').map(f => f.name).sort();
  } catch (err) {
    console.warn('getAvailableLevels:', err.message);
    return [];
  }
};

export const searchLessons = async (keyword) => {
  try {
    const data = await api({ action: 'search', keyword, folderId: FOLDER_ID });
    return data.lessons || [];
  } catch (err) {
    console.warn('searchLessons:', err.message);
    return [];
  }
};

const googleDriveClientExports = {
  loadGoogleAPI, getFolderId, listFilesInFolder, getFileContent,
  getLessonsBySubjectAndLevel, getAvailableSubjects, getAvailableLevels, searchLessons
};

export default googleDriveClientExports;
