import React, { Component } from 'react';
import './styles/ContactForm.css';

const INITIAL_STATE = {
  name: '',
  number: '',
  errors: {
    name: '',
    number: '',
  },
};

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  validateField = (name, value) => {
    let message = '';

    if (name === 'name') {
      const isValid =
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(
          value
        );
      message = isValid
        ? ''
        : "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
    } else if (name === 'number') {
      const isValid =
        /^\+?\d{1,4}([-.\s]?\d{1,3})?([-.\s]?\d{1,4})([-.\s]?\d{1,4})([-.\s]?\d{1,9})?$/.test(
          value
        );
      message = isValid
        ? ''
        : 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: message,
      },
    }));

    return message === '';
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.validateField(name, value));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number, errors } = this.state;

    const isNameValid = this.validateField('name', name);
    const isNumberValid = this.validateField('number', number);

    const formIsValid =
      isNameValid && isNumberValid && !errors.name && !errors.number;

    if (!formIsValid) {
      console.error('Validation Failed');
      return;
    }

    this.props.onAddContact(name, number);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number, errors } = this.state;

    return (
      <div>
        <form className="main-form" onSubmit={this.handleSubmit}>
          <div className="input-name">
            <label className="label">Name</label>
            <input
              type="text"
              className={errors.name ? 'incorrect-name' : 'input-name-correct'}
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
            {errors.name && <p className="incorrect">{errors.name}</p>}
          </div>
          <div className="input">
            <label className="label">Number</label>
            <input
              type="tel"
              className={errors.number ? 'incorrect' : 'input-number-correct'}
              name="number"
              value={number}
              onChange={this.handleChange}
              required
            />
            {errors.number && <p className="incorrect">{errors.number}</p>}
          </div>
          <input className="btn-submit" type="submit" value="Add contact" />
        </form>
      </div>
    );
  }
}

export default ContactForm;
