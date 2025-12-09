import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import UFByDate from './components/UFByDate.jsx';

export default function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            UF Chile • Proyecto 5 - UDD Bootcamp
          </Typography>
          <Button color="inherit" component={Link} to="/uf">Consultar UF</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/uf" element={<ErrorBoundary><UFByDate /></ErrorBoundary>} />
          <Route path="*" element={<ErrorBoundary><UFByDate /></ErrorBoundary>} />
        </Routes>
      </Container>
    </Box>
  );
}
