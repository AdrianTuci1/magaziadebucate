export const base64UrlDecode = (input: string): string => {
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    switch (input.length % 4) {
        case 0:
            break;
        case 2:
            input += '==';
            break;
        case 3:
            input += '=';
            break;
        default:
            throw new Error('Illegal base64url string!');
    }

    try {
        return decodeURIComponent(escape(window.atob(input)));
    } catch (e) {
        console.error('Failed to decode base64url string', e);
        return '';
    }
};
