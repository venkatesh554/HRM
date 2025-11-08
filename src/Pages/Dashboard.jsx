import React, { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import styles from './DashboardBlocks.module.css';

export default function Dashboard() {
  const [now, setNow] = useState(new Date());
  const [blockSeconds] = useState([42, 15, 33, 57]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatWithSeconds = (main, sec) => `${main}:${sec.toString().padStart(2, '0')}`;

  return (
    <div className="page-dashboard">
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
          <span style={{ fontSize: '2.1rem', fontWeight: 700, color: '#222', letterSpacing: '0.01em', lineHeight: 1 }}>{timeString}</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#673ab7', letterSpacing: '0.01em' }}>Good Morning</span>
        </div>
        <button
          style={{
            background: '#1976d2',
            border: 'none',
            borderRadius: '20px',
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'background 0.2s',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0 18px',
            gap: '0.5rem',
          }}
          title="Clock"
        >
          <FaRegClock color="#fff" size={20} style={{marginRight: 6}} />
          Clock
        </button>
      </div>
      <div className={styles['dashboard-blocks']}>
        <div className={styles['dashboard-block']}>
          <div className={styles['dashboard-block-label']}>Today's In Time</div>
          <div className={styles['dashboard-block-value']}>{formatWithSeconds('09:00', blockSeconds[0])}</div>
        </div>
        <div className={styles['dashboard-block']}>
          <div className={styles['dashboard-block-label']}>Today's Break Time</div>
          <div className={styles['dashboard-block-value']}>{formatWithSeconds('00:45', blockSeconds[1])}</div>
        </div>
        <div className={styles['dashboard-block']}>
          <div className={styles['dashboard-block-label']}>Today's Work Time</div>
          <div className={styles['dashboard-block-value']}>{formatWithSeconds('08:15', blockSeconds[2])}</div>
        </div>
        <div className={styles['dashboard-block']}>
          <div className={styles['dashboard-block-label']}>Today's Over Time</div>
          <div className={styles['dashboard-block-value']}>{formatWithSeconds('00:30', blockSeconds[3])}</div>
        </div>
      </div>
      <div style={{ marginTop: '2rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem', color: '#333',position:'relative',left:'-22%' }}>Weekly Time Distribution</h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'flex-start',
          gap: '1.2rem', 
          height: '200px', 
          padding: '1rem 0'
        }}>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={day} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: '0.5rem',
              width: '45px'
            }}>
              <div style={{ 
                width: '26px', 
                backgroundColor: '#e0e0e0',
                borderRadius: '4px 4px 0 0',
                position: 'relative',
                height: index === 6 ? '0' : '160px', 
                overflow: 'hidden'
              }}>
                {index !== 6 && (
                  <>
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '100%',
                      height: '65%',
                      backgroundColor: '#1e88e5',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '65%',
                      left: '0',
                      width: '100%',
                      height: '15%',
                      backgroundColor: '#00acc1',
                    }} />
                   
                    <div style={{
                      position: 'absolute',
                      bottom: '80%',
                      left: '0',
                      width: '100%',
                      height: '10%',
                      backgroundColor: '#26a69a',
                    }} />
                  </>
                )}
              </div>
              <span style={{ 
                fontSize: '0.8rem', 
                color: '#666', 
                fontWeight: index === 6 ? '400' : '600'
              }}>{day}</span>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#1e88e5', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>Work Time</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#00acc1', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>Break Time</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#26a69a', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>Overtime</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#e0e0e0', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>Remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
}