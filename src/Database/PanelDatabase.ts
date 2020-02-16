import Dexie from 'dexie';
import { toJS } from 'mobx';

class Database extends Dexie {
  bookmarks: Dexie.Table<Bookmark, number>;

  constructor() {
    super('MeteorToolsDatabase');

    this.version(1).stores({
      bookmarks: 'id, timestamp, log',
    });

    this.bookmarks = this.table('bookmarks');
  }

  addBookmark(log: DDPLog) {
    return this.bookmarks.add({
      id: log.timestamp,
      timestamp: Date.now(),
      log: toJS(log),
    });
  }

  getBookmark(key: number) {
    return this.bookmarks.get(key);
  }

  removeBookmark(key: number) {
    return this.bookmarks.delete(key);
  }

  getBookmarks() {
    return this.bookmarks.toArray();
  }
}

export const PanelDatabase = new Database();
