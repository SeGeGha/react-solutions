import { addYears } from '../utils/addYears';

export class Cookies {
    public domain: string;

    constructor (allowedDomains: string[]) {
        this.domain = allowedDomains.find(domain => window.location.hostname.match(domain)) || '';
    }

    deleteCookie (key: string): void {
        this.setCookie(key, '', new Date(0));
    }

    getCookie (key: string): string | null {
        const re      = Cookies.getRegExp(key);
        const matches = document.cookie.match(re);
        return matches === null ? null : matches[1];
    }

    setCookie (key: string, value: string, expDate: Date = addYears(new Date(), 10)): void {
        document.cookie = this.prepareCookie(key, value, expDate.toUTCString());
    }

    private prepareCookie (key: string, value: any, expDate: string): string {
        return `${ key }=${ value };expires=${ expDate };domain=${ this.domain };path=/`;
    }

    private static getRegExp (key: string): RegExp {
        return new RegExp(`(?:^|; )${key.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1')}=([^;]*)`);
    }
}
