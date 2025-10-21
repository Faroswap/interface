'server only';
import { API_DOMAIN } from '@/constants/url';
import crypto from 'crypto';
import axios from 'axios';

/** Used to request tokens in the server environment */
export async function getServerAuth() {
  if (typeof document !== 'undefined') {
    throw new Error('getServerAuth need server side');
  }
  const secret = process.env.GATEWAY_SERVER_SECRET ?? '';
  const id = process.env.GATEWAY_SERVER_ID;
  if (!secret || !id) {
    console.error('no GATEWAY_SERVER_SECRET or GATEWAY_SERVER_ID');
    return null;
  }
  const date = new Date().getTime();
  const hash = crypto.createHash('md5');
  const token = hash.update(secret + date).digest('hex');
  const url = `https://gateway${API_DOMAIN}/ssr/getAuthToken`;
  try {
    const res = await axios.post(url, {
      token,
      date,
      id,
    });
    if (res.data?.data) {
      return res.data.data;
    }
    console.error(res.data);
  } catch (e) {
    console.error(e);
  }
  return null;
}
