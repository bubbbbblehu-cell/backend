// staysafe-backend/api/index.js
const axios = require('axios');
const FormData = require('form-data');

module.exports = async (req, res) => {
    // 跨域设置
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        // 关键：填入你提供的 Token
        const COZE_TOKEN = "cztei_qS0HoZGrmCfjZNVBwzJlBBxFEhKP2boTUWLvZq33v633AN7HxujXE6wUwe6pnIFSO"; 
        
        // 解析前端传来的图片数据
        // 注意：前端 fetch 发送的是二进制流，这里直接透传
        const formData = new FormData();
        formData.append('file', req.body, { filename: 'upload.jpg' }); 

        const response = await axios.post('https://api.coze.cn/v1/files/upload', formData, {
            headers: {
                'Authorization': `Bearer ${COZE_TOKEN}`,
                ...formData.getHeaders()
            }
        });

        // 返回 Coze 生成的 file_id
        res.status(200).json({ file_id: response.data.data.id });
    } catch (error) {
        console.error("Coze Upload Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Upload failed" });
    }
};
