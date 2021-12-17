import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  return Promise.all([uploadPhoto(), createUser()])
    .then((result) => {
      const photoName = result[0].body;
      const { firstName, lastName } = result[1];
      console.log(`${photoName} ${firstName} ${lastName}`);
    })
    .catch(() => console.log('Signup system offline'));
}
