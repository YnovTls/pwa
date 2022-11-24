import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getMessaging, onBackgroundMessage, isSupported } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging-sw.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCN7CPluCiDukEHJ7kaTevfYN2Sha2Y-a8",
  authDomain: "web-mobile-7fc66.firebaseapp.com",
  databaseURL: "https://web-mobile-7fc66.firebaseio.com",
  projectId: "web-mobile-7fc66",
  storageBucket: "web-mobile-7fc66.appspot.com",
  messagingSenderId: "948628460197",
  appId: "1:948628460197:web:d4116fa50c69cfb2fb734c",
  measurementId: "G-MR8E953RJN",
});

const messaging = getMessaging(firebaseApp);

isSupported()
  .then((isSupported) => {
    if (isSupported) {
      onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
        console.log("SW : ", title);
        self.registration.showNotification(title, {
          body,
          icon: image || "/assets/icons/icon-72x72.png",
        });
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });
