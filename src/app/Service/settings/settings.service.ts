import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private STORAGE_KEY = 'fieldPermissions';

  constructor() {}

  getPermissions(): any {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
  }

  getFieldPermission(email: string, field: string): boolean {
    const permissions = this.getPermissions();
    return permissions[email]?.[field] || false;
  }

  setFieldPermission(email: string, field: string, value: boolean): void {
    const permissions = this.getPermissions();
    if (!permissions[email]) {
      permissions[email] = {};
    }
    permissions[email][field] = value;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(permissions));
  }
}
