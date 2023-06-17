import { useState } from "react";
import css from "./ContactForm.module.css"

const ContactForm = ({onSubmit}) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

   const handleChange = evt => {
       const { name, value } = evt.target;
        switch (name) {
            case 'name':
            setName(value);
            break;

            case 'number':
            setNumber(value);
            break;

            default:
            return;   
        }
    };
    
    const handleFormSubmit = evt => {
        evt.preventDefault();
        onSubmit(name, number);
        resetInput();
    };

    const resetInput = () => {
        setName(''); 
        setNumber('');
    };

        return (
            <form onSubmit={handleFormSubmit} className={css.form}>
                <label className={css.label}>Name</label>
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        // id={this.loginInputId}
                        placeholder="Enter name"
                        value={name}
                        onChange={handleChange}
                        className={css.input}
                        required
                />
                <label className={css.label}>Number</label>
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        placeholder="Enter phone number"
                        value={number}
                        onChange={handleChange}
                        className={css.input}
                        required
                        />

                    <button type="submit" className={css.button}>Add contact</button>
            </form>
        )
    
    }

export default ContactForm;