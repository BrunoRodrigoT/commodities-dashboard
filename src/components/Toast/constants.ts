import { cva } from 'class-variance-authority';

const icons = {
  success: {
    src: '/assets/icons/success.svg',
    alt: 'Sucesso',
  },
  error: {
    src: '/assets/icons/error.svg',
    alt: 'Erro',
  },
  warning: {
    src: '/assets/icons/warning.svg',
    alt: 'Cuidado',
  },
  info: {
    src: '/assets/icons/info.svg',
    alt: 'Informação',
  },
};

const toastVariants = cva(
  'flex items-center gap-2 shadow-1 rounded-4 cursor-pointer font-primary-sm text-base-0',
  {
    variants: {
      variant: {
        success: 'bg-success-400',
        error: 'bg-error-500',
        warning: 'bg-warning-400',
        info: 'bg-info-500',
      },
      size: {
        default: 'px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'success',
      size: 'default',
    },
  },
);

export { icons, toastVariants };
