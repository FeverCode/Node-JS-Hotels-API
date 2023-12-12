const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// Endpoint to get hotel rates
app.get('/api/hotel-rates', async (req, res) => {
  try {
    const { hotel_key, chk_in, chk_out } = req.query;
    const response = await axios.get(`https://data.xotelo.com/api/rates`, {
      params: {
        hotel_key,
        chk_in,
        chk_out
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get day heatmap
app.get('/api/hotel-heatmap', async (req, res) => {
  try {
    const { hotel_key, chk_out } = req.query;
    const response = await axios.get(`https://data.xotelo.com/api/heatmap`, {
      params: {
        hotel_key,
        chk_out
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
