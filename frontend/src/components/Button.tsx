import { Button as ShadButton } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isLoading?: boolean;
};

const Button: React.FC<Props> = ({ text, isLoading, ...props }) => {
    return (
        <ShadButton {...props} disabled={isLoading}>
            {isLoading ? <LoadingSpinner className="texte-white" /> : text}
        </ShadButton>
    );
}

export default Button;
