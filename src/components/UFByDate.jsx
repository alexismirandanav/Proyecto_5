import { useState, useRef } from 'react';
import { Paper, Typography, TextField, Button, CircularProgress, Stack, Alert } from '@mui/material';

const UFByDate = () => {
  const [dateStr, setDateStr] = useState(''); // DD-MM-YYYY
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const isValidDateFormat = (str) => /^\d{2}-\d{2}-\d{4}$/.test(str);

  const fetchUF = async () => {
    setError('');
    setResult(null);
    const q = dateStr.trim();
    if (!isValidDateFormat(q)) { setError('Formato inválido. Usa DD-MM-AAAA (ej: 09-12-2025).'); return; }
    try {
      setLoading(true);
      const response = await fetch(`https://findic.cl/api/uf/${q}`);
      if (!response.ok) throw new Error('No se pudo obtener la UF para la fecha indicada.');
      const data = await response.json();
      const item = Array.isArray(data?.serie) ? data.serie[0] : null;
      if (!item || typeof item.valor === 'undefined') throw new Error('La API no devolvió datos para esa fecha.');
      setResult({ fecha: item.fecha, valor: item.valor });
    } catch (err) {
      setError(err.message || 'Error inesperado al consultar la UF.');
    } finally { setLoading(false); }
  };

  const onKeyDown = (e) => { if (e.key === 'Enter') fetchUF(); };

  return (
    <Paper elevation={3} sx={{ maxWidth: 520, m: '24px auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>Consultar UF por fecha (DD-MM-AAAA)</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField inputRef={inputRef} value={dateStr} onChange={(e) => setDateStr(e.target.value)} onKeyDown={onKeyDown} placeholder="Ej: 09-12-2025" fullWidth />
        <Button variant="contained" onClick={fetchUF}>Consultar</Button>
      </Stack>
      {loading && (<Stack alignItems="center" sx={{ mt: 3 }}><CircularProgress /><Typography variant="body2" sx={{ mt: 1 }}>Cargando…</Typography></Stack>)}
      {error && (<Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>)}
      {result && (
        <Stack sx={{ mt: 3 }} spacing={0.5}>
          <Typography variant="body1"><b>Fecha:</b> {result.fecha}</Typography>
          <Typography variant="body1"><b>UF:</b> {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(result.valor)}</Typography>
        </Stack>
      )}
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Fuente: API de indicadores económicos de findic.cl
      </Typography>
    </Paper>
  );
};

export default UFByDate;
