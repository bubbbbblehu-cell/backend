 后端中转逻辑：接收图片并上传给 Coze
const axios = require('axios');
const FormData = require('form-data');

module.exports = async (req, res) = {
     解决跨域问题，允许你的 GitHub Pages 访问
    res.setHeader('Access-Control-Allow-Origin', '');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
         这里填入你的 Coze Access Token
        const COZE_TOKEN = 你的_ACCESS_TOKEN; 
        
         模拟调用 Coze 文件上传接口
         注意：这里使用标准 HTTP 请求，因为 SDK 在云函数中可能需要额外配置
        const formData = new FormData();
        formData.append('file', req.body.file);  这里需要前端配合传 binary

        const response = await axios.post('httpsapi.coze.cnv1filesupload', formData, {
            headers {
                'Authorization' `Bearer ${COZE_TOKEN}`,
                ...formData.getHeaders()
            }
        });

        res.status(200).json({ file_id response.data.data.id });
    } catch (error) {
        res.status(500).json({ error error.message });
    }
};