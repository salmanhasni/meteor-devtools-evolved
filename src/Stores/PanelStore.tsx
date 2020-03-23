import { action, observable } from 'mobx';
import React, { createContext, FunctionComponent } from 'react';
import { BookmarkStore } from './Panel/BookmarkStore';
import { DDPStore } from './Panel/DDPStore';
import { MinimongoStore } from './Panel/MinimongoStore';
import { PanelPage } from '@/Constants';

export class PanelStoreConstructor {
  @observable selectedTabId: string = PanelPage.DDP;
  @observable activeObject: ViewableObject = null;
  @observable.shallow activeStackTrace: StackTrace[] | null = null;

  ddpStore = new DDPStore();
  bookmarkStore = new BookmarkStore();
  minimongoStore = new MinimongoStore();

  constructor() {
    this.bookmarkStore.sync().catch(console.error);
  }

  @action
  setActiveObject(viewableObject: ViewableObject) {
    this.activeObject = viewableObject;
  }

  @action
  setActiveStackTrace(trace: StackTrace[] | null) {
    this.activeStackTrace = trace;
  }

  @action
  setSelectedTabId(selectedTabId: string) {
    this.selectedTabId = selectedTabId;
  }
}

export const PanelStore = new PanelStoreConstructor();

const PanelStoreContext = createContext<PanelStoreConstructor | null>(null);

export const PanelStoreProvider: FunctionComponent = ({ children }) => (
  <PanelStoreContext.Provider value={PanelStore}>
    {children}
  </PanelStoreContext.Provider>
);

export const usePanelStore = () => {
  const store = React.useContext(PanelStoreContext);

  if (!store) {
    throw new Error('Must be used within a provider.');
  }

  return store;
};
