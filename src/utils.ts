export const generateUserProfilePic = (username: string) => {
    const serviseUrl = 'https://avatar.iran.liara.run/username?username='
    return `${serviseUrl}${username}`;
}