// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          add_post: 'Add Post',
          title: 'Title',
          body: 'Content',
          save: 'Save',
          post_not_found: 'Post Not Found',
          posts: 'Posts',
          actions: 'Actions',
          delete: 'Delete',
          theme: {
            light: "Light",
            dark: "Dark"
          },
          nav: {
            home: "Home",
            add_post: "Add Post"
          },
          delete_post_confirmation: 'Are you sure you want to delete this post?',
          delete: 'Delete',
          cancel: 'Cancel',
          edit_post: 'Edit Post',
          search_posts: 'Search Posts',
        },
      },
      sv: {
        translation: {
          add_post: 'Lägg till Post',
          title: 'Titel',
          body: 'Kontent',
          save: 'Spara',
          post_not_found: 'Post inte hittat',
          posts: 'Postar',
          actions: 'Aktioner',
          delete: 'Ta bort',
            theme: {
                light: "Ljus",
                dark: "Mörk"
            },
            nav: {
                home: "Hemma",
                add_post: "Lägg till post"
            },
          delete_post_confirmation: 'Är du säker du vill ta bort detta inlägg?',
          delete: 'Ta bort',
          cancel: 'Avbryt',
          edit_post: 'Redigera inlägg',
          search_posts: 'Sök inlägg',
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
