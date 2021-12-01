import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import Progress from '@/components/Progress/Progress.vue';
import { ValidationProvider } from 'vee-validate';
import { extend } from 'vee-validate';
import { mimes, required } from 'vee-validate/dist/rules';
import { ValidationResult } from 'vee-validate/dist/types/types';
import SvgIcon from '@/components/Icons/SvgIcon.vue';
import Button from '@/components/Buttons/Button/Button.vue';

@Component({
  components: {
    Progress,
    ValidationProvider,
    Button,
    SvgIcon
  }
})
export default class Photo extends Vue {
  @Prop() url!: string;

  @Prop({ default: 'cover' }) size!: string;

  @Prop() text!: string;

  @Prop({ default: 'bottom' }) textPosition!: string;

  @Prop({ default: false }) hasUpload?: boolean;

  @Prop({ default: false }) hasRemove?: boolean;

  @Prop({ default: false }) isHovered?: boolean;

  @Prop({ default: false }) removeInside?: boolean;

  @Prop({ default: 0 }) photoId?: number;

  @Prop({ default: 3000 }) timeout?: number;

  @Prop({ default: false }) isUploadBtn?: boolean;

  @Prop({ default: '' }) width?: string;

  @Prop({ default: '' }) height?: string;

  @Emit('change')
  change() {
    return this.file;
  }
  @Emit('remove')
  remove() {
    return this.photoId;
  }
  @Emit('imgDataLoaded')
  imgDataLoaded(img: any) {
    return img;
  }

  @Watch('url')
  onChangeUrl() {
    this.loadImgStatic(this.url);
  }

  public img: HTMLImageElement = new Image();

  public imgLoaded: boolean = false;

  public showProgress: boolean = false;

  public file: any = null;

  public fileUrl: any = null;

  errorUpload?: boolean = false;

  $refs!: {
    provider: InstanceType<typeof ValidationProvider>;
    input: InstanceType<typeof HTMLInputElement>;
  };

  public beforeCreate() {
    extend('mimes', mimes);
  }
  public mounted() {
    if (this.url) {
      this.loadImg(this.url);
    }
  }

  public loadImgStatic(url: string) {
    this.img.onload = () => {
      this.imgDataLoaded(this.img);
      this.imgLoaded = true;
    };
    this.img.src = url;
    this.errorUpload = false;
  }

  public loadImg(url: string) {
    this.showProgress = true;
    this.img.onload = () => {
      this.imgDataLoaded(this.img);
      this.imgLoaded = true;
      this.showProgress = false;
    };
    this.img.src = url;
    setTimeout(() => {
      this.errorUpload = this.imgLoaded ? false : true;
      this.showProgress = false;
    }, this.timeout);
  }
  public async processFile(event: any) {
    const provider: InstanceType<typeof ValidationProvider> = this.$refs
      .provider;
    const res: ValidationResult = await provider.validate(event);
    if (!res.valid || !event.target.files[0]) return false;
    this.file = event.target.files[0];
    this.showProgress = true;
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result: any = reader.result;
        this.showProgress = false;
        if (!this.removeInside) {
          this.removeInside = true;
        }

        if (!this.isUploadBtn) {
          this.loadImg(result);
        }
        this.change();
        const input = this.$refs.input;
        input.value = '';
      };
      reader.readAsDataURL(this.file);
    }, 500);
  }

  public _remove() {
    this.file = null;
    this.img = new Image();
    this.imgLoaded = false;
    if (this.hasRemove) {
      this.remove();
    }
  }

  get style() {
    return {
      width: this.width,
      height: this.height
    };
  }
}
