import { registerSW } from 'virtual:pwa-register';

const pageHasNotScrolled = () => {
  return window.scrollY === 0;
};

document.body.addEventListener('keypress', event => {
  const formElements = ['input', 'textarea'];
  if (formElements.includes(event.target.tagName.toLowerCase())) {
    event.target.closest('form').setAttribute('data-unsaved-work', true);
  }
});

document.body.addEventListener('click', event => {
  if (event.target.tagName.toLowerCase() === 'select') {
    event.target.closest('form').setAttribute('data-unsaved-work', true);
  }
});

const noFormsWithUnsavedWork = () => {
  return document.querySelectorAll('form[data-unsaved-work]').length === 0;
};

const canReloadImmediately = () => {
  const conditions = [pageHasNotScrolled, noFormsWithUnsavedWork];
  return conditions.every(condition => condition());
};

const updateSW = registerSW({
  onRegisteredSW(r) {
    console.log('⚙️ Service worker registered');
    r &&
      setInterval(() => {
        r.update();
        console.log('⚙️ Service worker updated (via setInterval set after registration)');
      }, 60 * 60 * 1000);
  },
  onNeedRefresh() {
    if (canReloadImmediately()) {
      updateSW(true);
      console.log('⚙️ Service worker updated (automatically)');
      return;
    }

    const dialog = document.getElementById('pwa-update-dialog');

    dialog.addEventListener('close', async () => {
      if (dialog.returnValue === 'refresh') {
        updateSW(true);
        console.log('⚙️ Service worker updated (form)');
      }
    });

    dialog.showModal();

    document.addEventListener(
      'visibilitychange',
      async () => {
        if (!noFormsWithUnsavedWork()) {
          return;
        }

        updateSW(true);
        window.location.reload();
        console.log('⚙️ Service worker updated (visibility)');
      },
      { once: true }
    );
  },
  onOfflineReady() {
    console.log('⚙️ Site can now be used offline');
  },
  onRegisterError(error) {
    console.error('⚙️ Error during service worker registration:', error);
  },
});
