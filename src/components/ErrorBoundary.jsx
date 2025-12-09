import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('ErrorBoundary:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error" sx={{ my: 2 }}>
          <AlertTitle>Se produjo un error</AlertTitle>
          {this.state.error?.message ?? 'Ocurrió un error inesperado.'}
        </Alert>
      );
    }
    return this.props.children;
  }
}
