import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import * as bs from 'bootstrap/dist/css/bootstrap.css';

const Header = ({ query, changeSearchText, searchText}) => (
  <Navbar sticky="top" bg="dark" variant="dark">
    <Navbar.Brand href="#home">💸 Drag 'n' Split 💸</Navbar.Brand>
    <Nav className="mr-auto">
    </Nav>
  <Form inline>
    <FormControl value={searchText} onChange={(val) => changeSearchText(val.target.value)} size="sm" type="text" placeholder="Search" className="mr-sm-2" />
    <Button size="sm" variant="outline-info" onClick={query}>Search</Button>
  </Form>
  </Navbar>
);

export default Header;
