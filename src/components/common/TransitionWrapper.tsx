'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

const TransitionWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ margin: '100% 0% 0% 0%' }}
  >
    {children}
  </motion.div>
);

export default TransitionWrapper;
