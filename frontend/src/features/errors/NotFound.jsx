import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return <div className="text-center text-xl p-10">{t('page_not_found')}</div>;
};

export default NotFound;
