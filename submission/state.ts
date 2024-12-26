import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Request, Requests, State } from './types';

interface SubmissionState {
  requests: Requests;
  onTxSubmit: (tx: string, request: Request) => void;
  onTxSuccess: (tx: string, request: Request) => void;
  onTxFailed: (tx: string, request: Request) => void;
  onTxWarning: (tx: string, request: Request) => void;
}


export const useSubmission = create(persist<SubmissionState>((set) => ({
  requests: {},
  onTxSubmit: (tx, request) => {
    set((old) => {
      const newRequests = {...old.requests}
      newRequests[tx] = [{
        ...request,
        updateTime: Math.ceil(Date.now() / 1000),
      }, State.Running]
      return { requests: newRequests }
    })
  },
  onTxSuccess: (tx, request) => {
    set((old) => {
      const newRequests = {...old.requests}
      const time = Math.ceil(Date.now() / 1000);
      newRequests[tx] = [{
        ...request,
        updateTime: time,
        doneTime: time,
      }, State.Success]
      return { requests: newRequests }
    })
  },
  onTxFailed: (tx, request) => {
    set((old) => {
      const newRequests = {...old.requests,}
      const time = Math.ceil(Date.now() / 1000);
      newRequests[tx] = [{
        ...request,
        updateTime: time,
        doneTime: time,
      }, State.Failed]
      return { requests: newRequests }
    })
  },
  onTxWarning: (tx, request) => {
    set((old) => {
      const newRequests = {...old.requests,}
      const time = Math.ceil(Date.now() / 1000);
      newRequests[tx] = [{
        ...request,
        updateTime: time,
        doneTime: time,
      }, State.Warning]
      return { requests: newRequests }
    })
  },
}), {
  name: 'submission-storage',
  storage: createJSONStorage(() => localStorage),
}))
