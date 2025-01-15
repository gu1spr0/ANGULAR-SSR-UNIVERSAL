import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const HEADERS_KEY = makeStateKey<Record<string, string | string[]>>('REQUEST_HEADERS');

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headers: Record<string, string | string[]> | null = null;

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (this.transferState.hasKey(HEADERS_KEY)) {
      this.headers = this.transferState.get(HEADERS_KEY, null);
    }
  }

  getHeaders(): Record<string, string | string[]> | null {
    return this.headers;
  }

  saveHeaders(headers: Record<string, string | string[]>): void {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(HEADERS_KEY, headers);
    }
  }
}