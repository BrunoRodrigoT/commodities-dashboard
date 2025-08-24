export default function stringAvatar(name: string): string {
    const nameParts = name.split(' ');
    const firstInitial = nameParts[0][0];
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';

    return `${firstInitial}${lastInitial}`;
}