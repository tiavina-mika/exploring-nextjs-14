'use client';

import { useFormStatus } from 'react-dom';

import Button, { ButtonProps } from '../buttons/Button';
import Loading from '../Loading';

type Props = {
  text: string;
  loading?: boolean;
} & Omit<ButtonProps, 'children'>;

const FormSubmitButton = ({ text, loading, ...props }: Props) => {
  /**
   * if using useFormStatus in the form level (mainly for server actions)
   * all the child of the <form> can access to this hook
   */
  const { pending } = useFormStatus();

  return (
    <Button variant="contained" type="submit" fullWidth {...props}>
      {loading || pending ? <Loading /> : text}
    </Button>
  );
};

export default FormSubmitButton;
