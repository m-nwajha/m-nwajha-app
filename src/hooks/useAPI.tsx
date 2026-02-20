'use client';
import { useReducer, useCallback } from 'react';
import axios from 'axios';
import { FAILURE, INIT, SUCCESS } from '@/constants/actionTypeAPI';
import type { State, Action } from '@/@types/apiHook';

const reducer = <T,>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case INIT:
      return { ...state, isLoading: true, isError: false, error: null };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialState: State = {
  isLoading: false,
  isError: false,
  data: null,
  error: null,
};

const useAPI = (url: string, apiKey?: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getHeaders = useCallback((isFormData = false) => {
    const headers: Record<string, string> = {
      'x-api-key': apiKey || process.env.NEXT_PUBLIC_API_KEY || ''
    };
    if (!isFormData) headers['Content-Type'] = 'application/json';
    return headers;
  }, [apiKey]);

  const handleError = useCallback((error: any, fallback: string) =>
    error.response?.data?.message || error.message || fallback, []);

  const get = useCallback(async (customUrl?: string) => {
    dispatch({ type: INIT });
    try {
      const response = await axios.get(customUrl || url, {
        headers: getHeaders(),
      });
      dispatch({ type: SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload: handleError(error, 'فشل جلب البيانات'),
      });
    }
  }, [url, getHeaders, handleError]);

  const post = useCallback(async (body: any, isFormData = false) => {
    dispatch({ type: INIT });
    try {
      const response = await axios.post(url, body, {
        headers: getHeaders(body instanceof FormData || isFormData),
      });
      dispatch({ type: SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FAILURE, payload: handleError(error, 'فشل الارسال') });
    }
  }, [url, getHeaders, handleError]);

  const update = useCallback(async (body: any, id?: string) => {
    dispatch({ type: INIT });
    try {
      const endpoint = id ? `${url}/${id}` : url;
      const response = await axios.put(endpoint, body, {
        headers: getHeaders(body instanceof FormData),
      });
      dispatch({ type: SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FAILURE, payload: handleError(error, 'فشل التعديل') });
    }
  }, [url, getHeaders, handleError]);

  const del = useCallback(async (id?: string) => {
    dispatch({ type: INIT });
    try {
      const endpoint = id ? `${url}/${id}` : url;
      const response = await axios.delete(endpoint, {
        headers: getHeaders(),
      });
      dispatch({ type: SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FAILURE, payload: handleError(error, 'فشل الحذف') });
    }
  }, [url, getHeaders, handleError]);

  const patch = useCallback(async (body: any, isFormData = false, id?: string) => {
    dispatch({ type: INIT });
    try {
      const endpoint = id ? `${url}/${id}` : url;
      const response = await axios.patch(endpoint, body, {
        headers: getHeaders(body instanceof FormData || isFormData),
      });
      dispatch({ type: SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: FAILURE, payload: handleError(error, 'فشل التعديل') });
      throw error;
    }
  }, [url, getHeaders, handleError]);

  return { ...state, get, post, update, del, patch };
};

export default useAPI;
