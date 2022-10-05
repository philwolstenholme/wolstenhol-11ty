export default function PwLightbox() {
  return {
    open: false,
    srcSet: '',
    alt: '',
    width: '',
    height: '',
    className: '',
    style: '',
    showLoadingSpinner: true,
    generateSrcSet(src) {
      // Cloudinary has a limit on URL length.
      if (src.length > 255) {
        return src;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      return `https://wolstenhol.me/proxy/cloudinary/image/fetch/h_${height},w_${width},c_limit,f_auto,q_auto/${src} 1x,
            https://wolstenhol.me/proxy/cloudinary/image/fetch/h_${height * 2},w_${width * 2},c_limit,f_auto,q_auto/${src} 2x,
            https://wolstenhol.me/proxy/cloudinary/image/fetch/h_${height * 3},w_${width * 3},c_limit,f_auto,q_auto/${src} 3x`;
    },
    generateClassName() {
      return ['-rotate-3', '-rotate-2', '-rotate-1', 'rotate-3', 'rotate-2', 'rotate-1'].sort(() => 0.5 - Math.random())[0];
    },
    init() {
      this.$watch('open', value => {
        document.documentElement.classList.toggle('lightbox-open');
      });
    },
    onOpen($event) {
      this.srcSet = this.generateSrcSet($event.target.dataset.lightboxImage);
      const img = $event.target.tagName === 'IMG' ? $event.target : $event.target.querySelector('img');
      this.alt = img.getAttribute('alt');
      this.width = img.getAttribute('width');
      this.height = img.getAttribute('height');
      this.className = this.generateClassName();

      const viewportIsLandscape = window.matchMedia('(orientation: landscape)').matches;

      if (viewportIsLandscape) {
        this.style = `width: auto; height: 85vh;`;
      }

      this.open = true;

      this.$nextTick(() => {
        this.$root.showModal();
      });
    },
    onClose() {
      this.open = false;
      this.srcSet = '';
      this.alt = '';
      this.height = '';
      this.width = '';
      this.style = '';
      this.showLoadingSpinner = true;
    },
  };
}
