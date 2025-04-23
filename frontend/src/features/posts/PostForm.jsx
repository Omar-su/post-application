import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';

const PostForm = ({ title, setTitle, body, setBody, onSubmit, heading }) => {
  const { t } = useTranslation();

  return (
    <form
    onSubmit={onSubmit}
    className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-white shadow-md rounded"
    >
    <h1 className="text-xl font-bold">{heading}</h1>
    <div>
        <input
        data-testid="titleinput"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder={t('title')}
        />  
    </div>
    
    <div>
      <textarea
        data-testid="bodyinput"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder={t('body')}
        rows="5"
        />  
    </div>
    

    <Button type="submit" disabled={!title.trim() || !body.trim()}>
        {t('save')}
    </Button>
    </form>


  );
};

export default PostForm;
