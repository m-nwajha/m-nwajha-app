'use client';

import React, { useState, useRef } from 'react';
import {
  Input,
  TextArea,
  Button,
  Typography,
  Box,
  useToast,
} from '@/components/ui';
import { CN } from '@/utils/className';
import useAPI from '@/hooks/useAPI';
import { motion } from 'framer-motion';
import { SMILEYS } from '@/constants/smileys';
import ReCAPTCHA from 'react-google-recaptcha';

const TestimonialForm = () => {
  const { showToast } = useToast();
  const { post, isLoading } = useAPI('/api/testimonials');
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState<any>({
    name: '',
    role: '',
    company: '',
    content: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = recaptchaRef.current?.getValue();

    if (!token) {
      showToast('الرجاء التحقق من أنك لست روبوت.', 'error');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('company', formData.company);
      data.append('content', formData.content);
      data.append('rating', rating.toString());
      data.append('captcha', token);
      if (imageFile) {
        data.append('avatar', imageFile);
      }

      const res = await post(data, undefined, true);
      if (res && res.success) {
        showToast(
          'تم إرسال تقييمك بنجاح! سيتم مراجعته وظهوره قريباً.',
          'success',
        );
        setFormData({ name: '', role: '', company: '', content: '' });
        setRating(5);
        setImageFile(null);
        setImagePreview('');
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      showToast('فشل إرسال التقييم، يرجى المحاولة مرة أخرى.', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-sm'>
      <Typography
        color='secondary'
        variant='h3'
        size='h4'
        className='text-center mb-8 font-bold'>
        شاركنا تجربتك ✨
      </Typography>

      <form
        onSubmit={handleSubmit}
        className='space-y-6 text-right'>
        {/* Avatar Upload */}
        <div className='flex flex-col items-center mb-8'>
          <div className='relative group cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-secondary/30 hover:border-secondary overflow-hidden transition-all bg-secondary/5'>
            {imagePreview ? (
              <img
                src={imagePreview}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='flex flex-col items-center justify-center h-full text-secondary/40'>
                <i className='bi bi-person-bounding-box text-3xl'></i>
              </div>
            )}
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all pointer-events-none'>
              <span className='text-white text-[10px] font-medium'>
                رفع صورة
              </span>
            </div>
            <input
              type='file'
              onChange={handleFileChange}
              className='absolute inset-0 opacity-0 cursor-pointer z-10'
              accept='image/*'
            />
          </div>
          <p className='text-[10px] text-light/40 mt-2'>
            صورتك الشخصية (اختياري)
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-light/60 mb-2'>
              الاسم بالكامل
            </label>
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder='مثال: محمد أحمد'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-light/60 mb-2'>
              المسمى الوظيفي
            </label>
            <Input
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              placeholder='مثال: مدير مشاريع'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-light/60 mb-2'>
            الشركة (اختياري)
          </label>
          <Input
            value={formData.company}
            onChange={e =>
              setFormData({ ...formData, company: e.target.value })
            }
            placeholder='اسم الشركة التي تعمل بها'
          />
        </div>

        <Box className='flex flex-col items-center gap-4 py-4 bg-white/5 rounded-2xl border border-white/5'>
          <label className='text-sm font-medium text-light/60'>
            ما هو تقييمك لخدماتنا؟
          </label>
          <div className='flex items-center gap-4'>
            {SMILEYS.map(smiley => (
              <button
                key={smiley.value}
                type='button'
                onClick={() => setRating(smiley.value)}
                className={CN(
                  'flex flex-col items-center gap-2 transition-all duration-300 group',
                  rating === smiley.value
                    ? smiley.color + ' scale-125'
                    : 'text-light/30 grayscale hover:grayscale-0',
                )}>
                <i
                  className={CN(
                    'bi text-3xl',
                    smiley.icon,
                    rating === smiley.value ? 'bi-fill shadow-lg' : '',
                  )}></i>
                <span className='text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
                  {smiley.label}
                </span>
              </button>
            ))}
          </div>
        </Box>

        <div>
          <label className='block text-sm font-medium text-light/60 mb-2'>
            رأيك بالتفصيل
          </label>
          <TextArea
            value={formData.content}
            onChange={e =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder='اكتب هنا تجربتك مع خدماتنا...'
            rows={5}
            required
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            theme="dark"
            hl="ar"
          />

          <Button
            type='submit'
            disabled={isLoading}
            className='w-full h-14 rounded-2xl bg-secondary text-white font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-secondary/20'>
            {isLoading ? 'جاري الإرسال...' : 'إرسال التقييم الآن 🚀'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TestimonialForm;

