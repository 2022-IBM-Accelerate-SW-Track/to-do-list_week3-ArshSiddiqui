import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  const text = 'How now brown cow';
  const dueDate = "12/25/2022";
  fireEvent.change(inputTask, {target: {value: text}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(button);

  fireEvent.change(inputTask, {target: {value: text}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(button);

  const check = screen.getAllByText(/How now brown cow/i);
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  // No task name, but due date present
  const dueDate = "12/25/2022";
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(button);
  const check = screen.getAllByRole('link');
  expect(check.length).toBe(2);

  // No task name, and no due date
  fireEvent.click(button);
  const secondCheck = screen.getAllByRole('link');
  expect(secondCheck.length).toBe(2);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  // No due date, but task name present
  const text = 'How now brown cow';
  fireEvent.change(inputTask, {target: {value: text}});
  fireEvent.click(button);
  const check = screen.getAllByRole('link');
  expect(check.length).toBe(2);

  // No task name, and no due date
  fireEvent.click(button);
  const secondCheck = screen.getAllByRole('link');
  expect(secondCheck.length).toBe(2);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  const text = 'How now brown cow';
  const dueDate = "12/25/2022";
  fireEvent.change(inputTask, {target: {value: text}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(button);

  const check = screen.getAllByRole('link');
  expect(check.length).toBe(3);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const secondCheck = screen.getAllByRole('link');
  expect(secondCheck.length).toBe(2);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const button = screen.getByRole('button', {name: /Add/i});

  const text = 'How now brown cow';
  const dueDate = "12/25/2021";
  fireEvent.change(inputTask, {target: {value: text}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(button);

  const checkColor = screen.getByTestId(/How now brown cow/i).style.background;
  expect(checkColor).toBe("red");
 });
