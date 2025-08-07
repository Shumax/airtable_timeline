import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import EditItem from '../edit-item';

describe('EditItem Modal', () => {
  it('Allow user to name edit', () => {
    
    const handleSave = jest.fn();
    const handleClose = jest.fn();

    render(
      <EditItem
        open={true}
        onClose={handleClose}
        onSave={handleSave}
        defaultName="Initial Name"
      />
    );

    const input = screen.getByLabelText('Name');
    expect(input).toHaveValue('Initial Name'); 

    fireEvent.change(input, { target: { value: 'Updated Name' } });
    expect(input).toHaveValue('Updated Name'); 

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith('Updated Name');

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('Calls the onClose function when the cancel button is clicked', () => {
    const handleSave = jest.fn();
    const handleClose = jest.fn();

    render(
      <EditItem
        open={true}
        onClose={handleClose}
        onSave={handleSave}
        defaultName="Initial Name"
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleSave).not.toHaveBeenCalled();
  });
});