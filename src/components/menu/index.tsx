import { useContext } from "react";
import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

export default function Menu() {
  const { user, signOut } = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/dashboard" passHref>
              <Nav.Link>Dashboard</Nav.Link>
            </Link>
            <Link href="/calendar" passHref>
              <Nav.Link>Calendar</Nav.Link>
            </Link>
            <Link href="/financial" passHref>
              <Nav.Link>Financial</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <NavDropdown title={user?.member?.name || "User"} id="collasible-nav-dropdown">
              <Link href="/members" passHref>
                <NavDropdown.Item href="#">Members</NavDropdown.Item>
              </Link>
              <Link href="/users" passHref>
                <NavDropdown.Item href="#">Users</NavDropdown.Item>
              </Link>
              <Link href="/entity-preferences" passHref>
                <NavDropdown.Item href="#">Entity Preferences</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
