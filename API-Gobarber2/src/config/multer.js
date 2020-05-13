import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), //local onde será armazenado o arquivo
        filename: (req, file, cb ) => {
            crypto.randomBytes(16, (err, res)=> {
                if(err) return cb(err);
                //esse return, retorna o nome do aquico já codificado para hexa.extenção
                return cb(null, res.toString('hex') + extname(file.originalname));
            })
        }
    })
}

/*Não esquecer de improtar nas rotas:
    import multer from 'multer';
    import multerConfig from './config/multer'

    const upload = multer(multerConfig);

    routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true })
})
*/

