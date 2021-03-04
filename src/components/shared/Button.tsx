import { SyntheticEvent, ReactNode } from 'react';

type Props = {
    disabled?: boolean;
    children: ReactNode;
    className?: string;
    onClick?: (event: SyntheticEvent) => void;
};
const Button = ({ disabled, onClick, children, className }: Props) => {
    return (
        <button disabled={disabled} className={className} onClick={onClick}>
            {children}
        </button>
    );
};
export default Button;
