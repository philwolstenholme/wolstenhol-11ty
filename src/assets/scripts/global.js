import './service-worker-management';
import './utils/request-idle-callback';
import loadjs from 'loadjs';

requestIdleCallback(async () => {
  loadjs('https://wolstenhol.me/proxy/jsdelivr/npm/instant.page@5.1.1/instantpage.js', 'instantPage', {
    before: (path, el) => {
      el.integrity = 'sha256-aHQ9cMB6I1ChFkcoMA56Loxh9OHORS98dK/iLbGzGmU=';
      el.type = 'module';
      el.crossOrigin = 'anonymous';
    },
  });
});

console.info(
  `%c🚧 🖥👨‍💻 Welcome to my website! Is something not working? There's always room for improvement… You can report issues on GitHub 👨‍💻 🖥 🚧`,
  `
      color: white;
      background: linear-gradient(312deg, rgba(255,0,0,1) 0%, rgba(241,255,0,1) 15%, rgba(0,255,12,1) 30%, rgba(0,254,255,1) 43%, rgba(0,1,255,1) 59%, rgba(250,0,253,1) 88%, rgba(255,0,0,1) 100%);
      border: 1px solid white;
      padding: 1em;
      font-family: "Comic Sans MS";
      font-size: 1.5em;
      text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px;
  `
);
