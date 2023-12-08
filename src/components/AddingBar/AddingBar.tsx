import { FormEvent } from 'react';

type Props = {
    onSubmit: (arg: string) => void;
    isDisabled: boolean;
};

const AddingBar = ({onSubmit, isDisabled}: Props) => {
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const inputValue = (form.elements.namedItem('text') as HTMLInputElement).value;

        if (!inputValue.trim()) {
            console.log('ENTER SMTH TO SAVE');
            return;
        }

        onSubmit(inputValue);

        form.reset();
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="text"
                placeholder="Enter todo here"
                />
            <button type="submit" disabled={isDisabled}>Submit</button>
        </form>
    </div>
  );
};

export default AddingBar;

    