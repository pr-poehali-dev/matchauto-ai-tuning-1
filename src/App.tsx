import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

// ============================================================
// БАЗА ДАННЫХ АВТОМОБИЛЕЙ
// ============================================================
const CARS_DB = [
  { id: 1, name: 'Lada Vesta', price: 1200000, engine: 'petrol', transmission: 'manual', drive: 'fwd', power: 106, year: 2023, owners: 0, reliability: 62, tuning_ready: false, country: 'Россия', body: 'sedan', img: '🚗' },
  { id: 2, name: 'Toyota Camry', price: 3500000, engine: 'petrol', transmission: 'auto', drive: 'fwd', power: 181, year: 2022, owners: 1, reliability: 92, tuning_ready: true, country: 'Япония', body: 'sedan', img: '🚘' },
  { id: 3, name: 'BMW X5', price: 8900000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 340, year: 2022, owners: 1, reliability: 78, tuning_ready: true, country: 'Германия', body: 'suv', img: '🚙' },
  { id: 4, name: 'Porsche 911', price: 14500000, engine: 'petrol', transmission: 'auto', drive: 'rwd', power: 450, year: 2023, owners: 0, reliability: 88, tuning_ready: true, country: 'Германия', body: 'coupe', img: '🏎️' },
  { id: 5, name: 'Kia Rio', price: 1800000, engine: 'petrol', transmission: 'auto', drive: 'fwd', power: 123, year: 2023, owners: 0, reliability: 80, tuning_ready: false, country: 'Корея', body: 'sedan', img: '🚗' },
  { id: 6, name: 'Hyundai Tucson', price: 3200000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 150, year: 2022, owners: 0, reliability: 82, tuning_ready: true, country: 'Корея', body: 'suv', img: '🚙' },
  { id: 7, name: 'Mercedes GLE', price: 11000000, engine: 'diesel', transmission: 'auto', drive: 'awd', power: 272, year: 2022, owners: 0, reliability: 76, tuning_ready: true, country: 'Германия', body: 'suv', img: '🚙' },
  { id: 8, name: 'Audi A6', price: 6500000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 249, year: 2022, owners: 1, reliability: 74, tuning_ready: true, country: 'Германия', body: 'sedan', img: '🚘' },
  { id: 9, name: 'Volkswagen Tiguan', price: 3800000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 150, year: 2023, owners: 0, reliability: 79, tuning_ready: false, country: 'Германия', body: 'suv', img: '🚙' },
  { id: 10, name: 'Mazda CX-5', price: 3100000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 192, year: 2022, owners: 0, reliability: 87, tuning_ready: true, country: 'Япония', body: 'suv', img: '🚙' },
  { id: 11, name: 'Toyota Land Cruiser', price: 12000000, engine: 'diesel', transmission: 'auto', drive: 'awd', power: 227, year: 2022, owners: 0, reliability: 94, tuning_ready: true, country: 'Япония', body: 'suv', img: '🛻' },
  { id: 12, name: 'Honda Civic', price: 2200000, engine: 'petrol', transmission: 'auto', drive: 'fwd', power: 158, year: 2023, owners: 0, reliability: 85, tuning_ready: true, country: 'Япония', body: 'sedan', img: '🚗' },
  { id: 13, name: 'Skoda Octavia', price: 2500000, engine: 'petrol', transmission: 'auto', drive: 'fwd', power: 150, year: 2022, owners: 1, reliability: 77, tuning_ready: false, country: 'Чехия', body: 'sedan', img: '🚗' },
  { id: 14, name: 'BMW 3 Series', price: 5200000, engine: 'petrol', transmission: 'auto', drive: 'rwd', power: 258, year: 2022, owners: 0, reliability: 75, tuning_ready: true, country: 'Германия', body: 'sedan', img: '🚘' },
  { id: 15, name: 'Lexus RX', price: 7500000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 238, year: 2022, owners: 0, reliability: 91, tuning_ready: true, country: 'Япония', body: 'suv', img: '🚙' },
  { id: 16, name: 'Subaru Outback', price: 3600000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 175, year: 2022, owners: 1, reliability: 83, tuning_ready: false, country: 'Япония', body: 'suv', img: '🚙' },
  { id: 17, name: 'Mitsubishi Outlander', price: 3400000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 167, year: 2023, owners: 0, reliability: 78, tuning_ready: false, country: 'Япония', body: 'suv', img: '🚙' },
  { id: 18, name: 'Nissan X-Trail', price: 3300000, engine: 'petrol', transmission: 'auto', drive: 'awd', power: 163, year: 2022, owners: 1, reliability: 80, tuning_ready: false, country: 'Япония', body: 'suv', img: '🚙' },
  { id: 19, name: 'Chery Tiggo 8 Pro', price: 2800000, engine: 'petrol', transmission: 'auto', drive: 'fwd', power: 197, year: 2023, owners: 0, reliability: 68, tuning_ready: false, country: 'Китай', body: 'suv', img: '🚙' },
  { id: 20, name: 'Geely Coolray', price: 2100000, engine: 'petrol', transmission: 'auto', drive: 'fwd', power: 177, year: 2023, owners: 0, reliability: 65, tuning_ready: false, country: 'Китай', body: 'suv', img: '🚙' },
  { id: 21, name: 'Lada Niva Travel', price: 950000, engine: 'petrol', transmission: 'manual', drive: 'awd', power: 80, year: 2023, owners: 0, reliability: 60, tuning_ready: false, country: 'Россия', body: 'suv', img: '🛻' },
  { id: 22, name: 'Ford Focus', price: 1900000, engine: 'petrol', transmission: 'auto', drive: 'fwd', power: 150, year: 2021, owners: 2, reliability: 72, tuning_ready: true, country: 'Германия', body: 'hatchback', img: '🚗' },
  { id: 23, name: 'Renault Duster', price: 1700000, engine: 'petrol', transmission: 'manual', drive: 'awd', power: 135, year: 2022, owners: 1, reliability: 73, tuning_ready: false, country: 'Франция', body: 'suv', img: '🚙' },
];

// ============================================================
// ТИПЫ
// ============================================================
interface FormParams {
  budget: number;
  bodies: string[];
  engine: string;
  drive: string[];
  transmission: string[];
  powerMax: number;
  tuningWanted: boolean;
  isNew: string;
  owners: number | null;
  goal: string;
}

interface CarData {
  id: number; name: string; price: number; engine: string; transmission: string;
  drive: string; power: number; year: number; owners: number; reliability: number;
  tuning_ready: boolean; country: string; body: string; img: string;
}

interface CarResult {
  car: CarData;
  index: number;
  pros: string[];
  cons: string[];
  tax: number;
}

type Page = 'home' | 'results' | 'tuning' | 'clients' | 'howworks';

// ============================================================
// ИИ-АЛГОРИТМ
// ============================================================
function calcIndex(car: CarData, p: FormParams): number {
  const diff = Math.abs(car.price - p.budget);
  let idx = (car.reliability / (diff + 1)) * 10000;
  if (p.tuningWanted && car.tuning_ready) idx *= 1.2;
  if (p.owners !== null && car.owners <= p.owners) idx *= 1.1;
  if (car.power > p.powerMax) idx *= 0.3;
  return idx;
}

function makePros(car: CarData): string[] {
  const list: string[] = [];
  if (car.reliability >= 85) list.push('Высокая надёжность по данным владельцев');
  else if (car.reliability >= 75) list.push('Хорошая надёжность, редкие поломки');
  if (car.owners === 0) list.push('Без пробега — только из салона');
  else if (car.owners === 1) list.push('Один хозяин, понятная история');
  if (car.tuning_ready) list.push('Отличная база для тюнинга');
  if (car.drive === 'awd') list.push('Полный привод — уверенность в любых условиях');
  if (car.power > 200) list.push(`Мощный мотор ${car.power} л.с. — динамика`);
  if (car.price < 2500000) list.push('Доступная цена на рынке');
  if (car.transmission === 'auto') list.push('Комфортный автомат для города');
  return list.slice(0, 3);
}

function makeCons(car: CarData, p: FormParams): string[] {
  const list: string[] = [];
  if (car.price > p.budget * 1.15) list.push('Цена немного выше вашего бюджета');
  if (car.reliability < 70) list.push('Относительно невысокий балл надёжности');
  if (!car.tuning_ready && p.tuningWanted) list.push('Ограниченные возможности тюнинга');
  if (car.owners > 1) list.push(`${car.owners} хозяина — история требует проверки`);
  if (car.power > 250) list.push(`Повышенный транспортный налог: ${(car.power * 150).toLocaleString('ru-RU')} ₽/год`);
  if (car.country !== 'Россия') list.push(`Пригон из ${car.country} — доп. 2–4 недели`);
  else list.push('Ограниченный выбор комплектаций');
  return list.slice(0, 3);
}

// ============================================================
// NAV
// ============================================================
function Nav({ current, go }: { current: Page; go: (p: Page) => void }) {
  const links: { id: Page; label: string }[] = [
    { id: 'home', label: 'Главная' },
    { id: 'howworks', label: 'Как работает' },
    { id: 'clients', label: 'Клиенты' },
    { id: 'tuning', label: 'Тюнинг' },
  ];
  return (
    <nav style={{ background: 'rgba(10,10,10,0.92)', borderBottom: '1px solid var(--ma-border)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'var(--ma-accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#000', fontSize: 16 }}>⚡</span>
          </div>
          <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--ma-text)', letterSpacing: '0.06em' }}>
            MATCH<span style={{ color: 'var(--ma-accent)' }}>AUTO</span>
          </span>
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: current === l.id ? 'var(--ma-accent-dim)' : 'none', border: 'none', cursor: 'pointer',
              padding: '8px 14px', borderRadius: 8, color: current === l.id ? 'var(--ma-accent)' : 'var(--ma-text-muted)',
              fontSize: 14, fontWeight: 500, fontFamily: 'Golos Text, sans-serif', transition: 'all 0.2s'
            }}>{l.label}</button>
          ))}
        </div>
        <button className="ma-btn" onClick={() => go('home')} style={{ fontSize: 13, padding: '8px 18px' }}>
          Подобрать авто
        </button>
      </div>
    </nav>
  );
}

// ============================================================
// ГЛАВНАЯ
// ============================================================
function HomePage({ onResults }: { onResults: (r: CarResult[]) => void }) {
  const [params, setParams] = useState<FormParams>({
    budget: 3000000, bodies: [], engine: 'any', drive: [], transmission: [],
    powerMax: 500, tuningWanted: false, isNew: 'any', owners: null, goal: 'everyday',
  });
  const [taxAlert, setTaxAlert] = useState(false);

  const fmt = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)} млн ₽` : `${(n / 1000).toFixed(0)} тыс ₽`;

  function submit() {
    const scored: CarResult[] = CARS_DB.map(car => ({
      car, index: calcIndex(car, params), pros: makePros(car), cons: makeCons(car, params), tax: car.power * 150,
    }));
    scored.sort((a, b) => b.index - a.index);
    const top5 = scored.slice(0, 5);
    sessionStorage.setItem('matchauto_results', JSON.stringify(top5));
    sessionStorage.setItem('matchauto_params', JSON.stringify(params));
    onResults(top5);
  }

  const tog = (arr: string[], v: string) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  return (
    <div>
      {/* HERO */}
      <div className="grid-bg" style={{ minHeight: '76vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '15%', right: '8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,180,216,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%' }}>
          <div className="animate-fade-in-up" style={{ marginBottom: 20 }}>
            <span className="ma-tag">⚡ ИИ-подбор за 3 секунды</span>
          </div>
          <h1 className="animate-fade-in-up delay-100" style={{
            fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(44px, 7.5vw, 96px)',
            fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 28,
          }}>
            ВАША МАШИНА<br />
            <span style={{ color: 'var(--ma-accent)' }} className="text-glow">УЖЕ НАЙДЕНА</span>
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ color: 'var(--ma-text-muted)', fontSize: 17, maxWidth: 520, lineHeight: 1.65, marginBottom: 48 }}>
            Задайте параметры — ИИ подберёт 5 лучших вариантов с плюсами, минусами, налогом и стоимостью доставки
          </p>
          <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[['20+', 'авто в базе'], ['94%', 'точность подбора'], ['3 сек', 'анализ'], ['₽ 0', 'стоимость подбора']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 28, fontWeight: 700, color: 'var(--ma-accent)' }}>{v}</div>
                <div style={{ color: 'var(--ma-text-muted)', fontSize: 12 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ФОРМА */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="ma-card" style={{ padding: 40 }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 26, letterSpacing: '0.04em', marginBottom: 6 }}>ПАРАМЕТРЫ ПОДБОРА</h2>
          <p style={{ color: 'var(--ma-text-muted)', fontSize: 13, marginBottom: 36 }}>Заполните форму — чем точнее, тем лучше результат</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {/* Бюджет */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>💰 Бюджет</span>
                <span style={{ color: 'var(--ma-accent)', fontFamily: 'Oswald, sans-serif', fontSize: 22, fontWeight: 600 }}>{fmt(params.budget)}</span>
              </label>
              <input type="range" min={500000} max={15000000} step={100000} value={params.budget}
                onChange={e => setParams(p => ({ ...p, budget: +e.target.value }))} style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ma-text-muted)', fontSize: 12, marginTop: 4 }}>
                <span>500 тыс ₽</span><span>15 млн ₽</span>
              </div>
            </div>

            {/* Кузов */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>🚗 Тип кузова</div>
              {[['sedan', 'Седан'], ['suv', 'Внедорожник'], ['hatchback', 'Хэтчбек'], ['coupe', 'Купе']].map(([v, l]) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, marginBottom: 10 }}>
                  <input type="checkbox" checked={params.bodies.includes(v)}
                    onChange={() => setParams(p => ({ ...p, bodies: tog(p.bodies, v) }))} />{l}
                </label>
              ))}
            </div>

            {/* Двигатель */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>⛽ Двигатель</div>
              {[['any', 'Любой'], ['petrol', 'Бензин'], ['diesel', 'Дизель']].map(([v, l]) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, marginBottom: 10 }}>
                  <input type="radio" name="engine" checked={params.engine === v}
                    onChange={() => setParams(p => ({ ...p, engine: v }))} />{l}
                </label>
              ))}
            </div>

            {/* Привод */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>⚙️ Привод</div>
              {[['fwd', 'Передний'], ['rwd', 'Задний'], ['awd', 'Полный']].map(([v, l]) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, marginBottom: 10 }}>
                  <input type="checkbox" checked={params.drive.includes(v)}
                    onChange={() => setParams(p => ({ ...p, drive: tog(p.drive, v) }))} />{l}
                </label>
              ))}
            </div>

            {/* КПП */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>🔄 КПП</div>
              {[['auto', 'Автомат'], ['manual', 'Механика']].map(([v, l]) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, marginBottom: 10 }}>
                  <input type="checkbox" checked={params.transmission.includes(v)}
                    onChange={() => setParams(p => ({ ...p, transmission: tog(p.transmission, v) }))} />{l}
                </label>
              ))}
            </div>

            {/* Мощность */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontWeight: 600, fontSize: 15 }}>
                <span>🏁 Мощность (до)</span>
                <span style={{ color: 'var(--ma-accent)', fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}>{params.powerMax} л.с.</span>
              </label>
              <input type="range" min={60} max={500} step={10} value={params.powerMax}
                onChange={e => { setParams(p => ({ ...p, powerMax: +e.target.value })); setTaxAlert(+e.target.value > 250); }}
                style={{ width: '100%' }} />
              {taxAlert && (
                <div style={{ marginTop: 10, padding: '10px 14px', background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.25)', borderRadius: 8, color: '#ffb400', fontSize: 13 }}>
                  ⚠️ Мощность {'>'}250 л.с. — повышенный налог от <strong>{(250 * 150).toLocaleString('ru-RU')} ₽/год</strong>
                </div>
              )}
            </div>

            {/* Тюнинг */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>🔧 Планируете тюнинг?</div>
              {[['yes', 'Да'], ['no', 'Нет']].map(([v, l]) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, marginBottom: 10 }}>
                  <input type="radio" name="tuning" checked={params.tuningWanted === (v === 'yes')}
                    onChange={() => setParams(p => ({ ...p, tuningWanted: v === 'yes' }))} />{l}
                </label>
              ))}
            </div>

            {/* Хозяева */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>👤 Макс. хозяев</div>
              {[[null, 'Любое'], [0, 'Новый (0)'], [1, 'До 1'], [2, 'До 2']].map(([v, l]) => (
                <label key={String(v)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, marginBottom: 10 }}>
                  <input type="radio" name="owners" checked={params.owners === v}
                    onChange={() => setParams(p => ({ ...p, owners: v as number | null }))} />{l}
                </label>
              ))}
            </div>

            {/* Цель */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>🎯 Цель покупки</div>
              {[['everyday', 'Ежедневная езда'], ['business', 'Бизнес/статус'], ['sport', 'Спорт'], ['offroad', 'Бездорожье']].map(([v, l]) => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, marginBottom: 10 }}>
                  <input type="radio" name="goal" checked={params.goal === v}
                    onChange={() => setParams(p => ({ ...p, goal: v }))} />{l}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <button className="ma-btn animate-pulse-glow" onClick={submit} style={{ fontSize: 17, padding: '18px 56px' }}>
              ⚡ Подобрать 5 машин
            </button>
            <p style={{ color: 'var(--ma-text-muted)', fontSize: 12, marginTop: 10 }}>Анализируем базу {CARS_DB.length} автомобилей</p>
          </div>
        </div>

        {/* КАК РАБОТАЕТ мини */}
        <div style={{ marginTop: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 32, fontWeight: 700, letterSpacing: '0.04em' }}>КАК ЭТО РАБОТАЕТ</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { n: '01', title: 'Заполняете форму', desc: 'Бюджет, кузов, двигатель и цель', icon: '📝' },
              { n: '02', title: 'ИИ анализирует', desc: 'Алгоритм считает индекс выгоды', icon: '🤖' },
              { n: '03', title: 'Получаете топ-5', desc: 'Карточки с плюсами и налогом', icon: '🏆' },
              { n: '04', title: 'Заказываете', desc: 'Менеджер организует доставку', icon: '🚚' },
            ].map(s => (
              <div key={s.n} className="ma-card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, right: 16, fontFamily: 'Oswald, sans-serif', fontSize: 52, fontWeight: 700, color: 'rgba(0,180,216,0.06)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: 'var(--ma-text-muted)', fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ПРИМЕР */}
        <div style={{ marginTop: 80 }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 32, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 8 }}>ПРИМЕР ПОДБОРА</h2>
          <p style={{ color: 'var(--ma-text-muted)', fontSize: 14, marginBottom: 28 }}>Бюджет 3,5 млн ₽ · внедорожник · автомат</p>
          <div className="ma-card" style={{ padding: 32, display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 72 }}>🚙</div>
            <div style={{ flex: 1 }}>
              <span className="ma-tag" style={{ marginBottom: 10, display: 'inline-flex' }}>🏆 #1 результат</span>
              <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Mazda CX-5</h3>
              <p style={{ color: 'var(--ma-accent)', fontFamily: 'Oswald, sans-serif', fontSize: 22, fontWeight: 600, marginBottom: 14 }}>3 100 000 ₽</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['192 л.с.', 'Автомат', 'Полный', '2022 г.', 'Надёжность 87%'].map(t => (
                  <span key={t} style={{ background: 'var(--ma-border)', padding: '4px 10px', borderRadius: 6, fontSize: 12, color: 'var(--ma-text-muted)' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['✅ Надёжность 87%', '✅ Один хозяин', '✅ Тюнинг-готов'].map(t => (
                <div key={t} style={{ fontSize: 13, color: 'var(--ma-text)' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// РЕЗУЛЬТАТЫ
// ============================================================
function ResultsPage({ results, onTuning, onBack }: { results: CarResult[]; onTuning: (c: CarData) => void; onBack: () => void }) {
  const [loading, setLoading] = useState(true);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      let i = 0;
      const iv = setInterval(() => { i++; setShown(i); if (i >= results.length) clearInterval(iv); }, 200);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const params: FormParams | null = (() => { try { return JSON.parse(sessionStorage.getItem('matchauto_params') || 'null'); } catch { return null; } })();

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', gap: 24 }}>
      <div style={{ width: 60, height: 60, border: '3px solid var(--ma-border)', borderTopColor: 'var(--ma-accent)', borderRadius: '50%' }} className="animate-spin-custom" />
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: 22, fontWeight: 600, marginBottom: 6 }}>ИИ анализирует базу...</p>
        <p style={{ color: 'var(--ma-text-muted)', fontSize: 14 }}>Рассчитываем индекс выгоды для {CARS_DB.length} авто</p>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {['Авито', 'Авто.ру', 'Дром'].map((s, i) => (
          <span key={s} className="ma-tag" style={{ opacity: 0, animation: `fadeIn 0.4s ${0.5 + i * 0.3}s forwards` }}>{s}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: 40 }}>
        <span className="ma-tag" style={{ marginBottom: 12, display: 'inline-flex' }}>Готово за 2.1 сек</span>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 36, fontWeight: 700, letterSpacing: '0.04em' }}>
          ТОП-5 <span style={{ color: 'var(--ma-accent)' }}>ПОДБОРКА ИИ</span>
        </h1>
        {params && <p style={{ color: 'var(--ma-text-muted)', fontSize: 13, marginTop: 4 }}>Бюджет: {(params.budget / 1000000).toFixed(1)} млн ₽</p>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {results.map((r, i) => (
          <div key={r.car.id} className="ma-card" style={{
            padding: 28, opacity: i < shown ? 1 : 0, transform: i < shown ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.4s, transform 0.4s',
          }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Rank */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: i === 0 ? 'var(--ma-accent)' : 'var(--ma-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Oswald, sans-serif', fontSize: 18, fontWeight: 700,
                  color: i === 0 ? '#000' : 'var(--ma-text-muted)'
                }}>#{i + 1}</div>
                <div style={{ fontSize: 36 }}>{r.car.img}</div>
              </div>

              {/* Основное */}
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 24, fontWeight: 700, margin: 0 }}>{r.car.name}</h3>
                  {i === 0 && <span className="ma-tag">🏆 Лучший выбор</span>}
                </div>
                <p style={{ color: 'var(--ma-accent)', fontFamily: 'Oswald, sans-serif', fontSize: 22, fontWeight: 600, marginBottom: 10 }}>
                  {r.car.price.toLocaleString('ru-RU')} ₽
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {[`${r.car.power} л.с.`, r.car.transmission === 'auto' ? 'Автомат' : 'Механика',
                    r.car.drive === 'awd' ? 'Полный' : r.car.drive === 'fwd' ? 'Передний' : 'Задний',
                    `${r.car.year} г.`, `${r.car.owners} хоз.`, r.car.country].map(t => (
                    <span key={t} style={{ background: 'var(--ma-border)', padding: '3px 8px', borderRadius: 5, fontSize: 12, color: 'var(--ma-text-muted)' }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginBottom: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ma-text-muted)', marginBottom: 4 }}>
                    <span>Надёжность</span>
                    <span style={{ color: r.car.reliability >= 80 ? '#4caf50' : r.car.reliability >= 70 ? '#ffb400' : '#f55' }}>{r.car.reliability}%</span>
                  </div>
                  <div className="ma-progress"><div className="ma-progress-fill" style={{ width: `${r.car.reliability}%` }} /></div>
                </div>
              </div>

              {/* Плюсы / минусы */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minWidth: 280, flex: '0 0 auto' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ma-text-muted)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Плюсы</div>
                  {r.pros.map((p, pi) => (
                    <div key={pi} style={{ display: 'flex', gap: 5, marginBottom: 5, fontSize: 12 }}>
                      <span style={{ flexShrink: 0 }}>✅</span><span style={{ color: 'var(--ma-text)', lineHeight: 1.4 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ma-text-muted)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Минусы</div>
                  {r.cons.map((c, ci) => (
                    <div key={ci} style={{ display: 'flex', gap: 5, marginBottom: 5, fontSize: 12 }}>
                      <span style={{ flexShrink: 0 }}>❌</span><span style={{ color: 'var(--ma-text)', lineHeight: 1.4 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Налог + кнопки */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--ma-border)', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--ma-text-muted)' }}>💰 Налог: <strong style={{ color: 'var(--ma-text)' }}>{r.tax.toLocaleString('ru-RU')} ₽/год</strong></span>
                <span style={{ fontSize: 13, color: 'var(--ma-text-muted)' }}>📦 Доставка: <strong style={{ color: 'var(--ma-text)' }}>по запросу</strong></span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {r.car.tuning_ready && (
                  <button className="ma-btn-ghost" onClick={() => onTuning(r.car)} style={{ fontSize: 13, padding: '9px 18px' }}>🔧 Тюнинг</button>
                )}
                <button className="ma-btn" style={{ fontSize: 13, padding: '9px 20px' }}>📞 Заказать</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Совет ИИ */}
      <div className="ma-card" style={{ padding: 24, marginTop: 28, borderColor: 'var(--ma-border-accent)', background: 'var(--ma-accent-dim)' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>🤖</span>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--ma-accent)', fontSize: 14 }}>Совет ИИ-аналитика</div>
            <p style={{ color: 'var(--ma-text)', fontSize: 13, lineHeight: 1.6 }}>
              Наиболее выгодным по соотношению цена/надёжность является <strong>{results[0]?.car.name}</strong>.
              {results[0]?.car.tuning_ready ? ' Эта модель — хорошая база для тюнинга.' : ''} Рекомендуем проверить историю по VIN перед покупкой.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, marginTop: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="ma-btn-ghost" onClick={onBack} style={{ fontSize: 15, padding: '13px 28px' }}>🔄 Подобрать заново</button>
        <button className="ma-btn" onClick={() => {
          const blob = new Blob([JSON.stringify(results.map(r => ({ name: r.car.name, price: r.car.price, pros: r.pros, cons: r.cons, tax: r.tax })), null, 2)], { type: 'application/json' });
          const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'matchauto-results.json'; a.click();
        }} style={{ fontSize: 15, padding: '13px 28px' }}>📥 Скачать подборку</button>
      </div>
    </div>
  );
}

// ============================================================
// ТЮНИНГ
// ============================================================
const TUNING_OPTS = {
  exhaust: { label: '🔊 Выхлоп', opts: ['Стандарт', 'Спортивный прямоток', 'Valve exhaust', 'Akrapovič'] },
  spoiler: { label: '🏎️ Спойлер', opts: ['Без спойлера', 'Lip-кит', 'Спортивный GT', 'Carbon Wing'] },
  seats: { label: '💺 Сиденья', opts: ['Стандарт', 'Спортивные ковши', 'Кожа + подогрев', 'Recaro Racing'] },
  wheels: { label: '🔵 Диски', opts: ['Стандарт', 'Кованые R19', 'Carbon R20', 'BBS R21'] },
  color: { label: '🎨 Цвет', opts: ['Оригинальный', 'Матовый чёрный', 'Satin Midnight Blue', 'Candy Red', 'Хром-хамелеон'] },
};

function TuningPage({ initCar, onCarSelect }: { initCar: CarData | null; onCarSelect: (c: CarData) => void }) {
  const [car, setCar] = useState<CarData | null>(initCar);
  const [cfg, setCfg] = useState<Record<string, string>>({ exhaust: 'Стандарт', spoiler: 'Без спойлера', seats: 'Стандарт', wheels: 'Стандарт', color: 'Оригинальный' });
  const [saved, setSaved] = useState(false);
  const tuneable = CARS_DB.filter(c => c.tuning_ready);

  function save() {
    const blob = new Blob([JSON.stringify({ car: car?.name, config: cfg, ts: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'matchauto-tuning.json'; a.click();
    setSaved(true); setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: 40 }}>
        <span className="ma-tag" style={{ marginBottom: 12, display: 'inline-flex' }}>Конструктор</span>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 38, fontWeight: 700, letterSpacing: '0.04em' }}>
          КОНСТРУКТОР <span style={{ color: 'var(--ma-accent)' }}>ТЮНИНГА</span>
        </h1>
        <p style={{ color: 'var(--ma-text-muted)', marginTop: 6, fontSize: 14 }}>Соберите конфигурацию — менеджер свяжется и согласует детали</p>
      </div>

      {/* Выбор авто */}
      <div className="ma-card" style={{ padding: 28, marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 18, marginBottom: 16, letterSpacing: '0.04em' }}>ВЫБЕРИТЕ АВТОМОБИЛЬ</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {tuneable.map(c => (
            <button key={c.id} onClick={() => { setCar(c); onCarSelect(c); }} style={{
              background: car?.id === c.id ? 'var(--ma-accent-dim)' : 'var(--ma-border)',
              border: `1px solid ${car?.id === c.id ? 'var(--ma-border-accent)' : 'transparent'}`,
              borderRadius: 8, padding: '12px 14px', cursor: 'pointer',
              color: car?.id === c.id ? 'var(--ma-accent)' : 'var(--ma-text)',
              textAlign: 'left', transition: 'all 0.2s', fontFamily: 'Golos Text, sans-serif',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{c.img}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ma-text-muted)' }}>{c.power} л.с.</div>
            </button>
          ))}
        </div>
      </div>

      {car ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28 }}>
          {/* Опции */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {Object.entries(TUNING_OPTS).map(([key, opt]) => (
              <div key={key} className="ma-card" style={{ padding: 22 }}>
                <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>{opt.label}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {opt.opts.map(o => (
                    <button key={o} onClick={() => setCfg(c => ({ ...c, [key]: o }))} style={{
                      textAlign: 'left', padding: '9px 12px', borderRadius: 7,
                      background: cfg[key] === o ? 'var(--ma-accent-dim)' : 'transparent',
                      border: `1px solid ${cfg[key] === o ? 'var(--ma-border-accent)' : 'var(--ma-border)'}`,
                      color: cfg[key] === o ? 'var(--ma-accent)' : 'var(--ma-text)',
                      cursor: 'pointer', fontSize: 13, transition: 'all 0.2s', fontFamily: 'Golos Text, sans-serif',
                    }}>
                      {o} {cfg[key] === o && <span style={{ float: 'right' }}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Превью */}
          <div>
            <div className="ma-card" style={{ padding: 28, position: 'sticky', top: 80 }}>
              <div style={{
                height: 180, background: 'linear-gradient(135deg, #151515 0%, #1a1a1a 100%)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, border: '1px solid var(--ma-border-accent)', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(0,180,216,0.08) 0%, transparent 70%)' }} />
                <div style={{ textAlign: 'center', zIndex: 1 }}>
                  <div style={{ fontSize: 72 }}>{car.img}</div>
                  <div style={{ color: 'var(--ma-text-muted)', fontSize: 11, marginTop: 6 }}>Фото согласует менеджер</div>
                </div>
              </div>
              <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 20, marginBottom: 2 }}>{car.name}</h3>
              <p style={{ color: 'var(--ma-accent)', fontSize: 17, fontWeight: 600, marginBottom: 18 }}>{car.price.toLocaleString('ru-RU')} ₽</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {Object.entries(TUNING_OPTS).map(([key, opt]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--ma-text-muted)' }}>{opt.label.split(' ').slice(1).join(' ')}</span>
                    <span style={{ color: cfg[key] === opt.opts[0] ? 'var(--ma-text-muted)' : 'var(--ma-accent)' }}>{cfg[key]}</span>
                  </div>
                ))}
              </div>
              <button className="ma-btn" onClick={save} style={{ width: '100%', fontSize: 14, marginBottom: 10 }}>
                {saved ? '✅ Отправлено!' : '💾 Сохранить проект'}
              </button>
              <button className="ma-btn-ghost" onClick={() => setCfg({ exhaust: 'Стандарт', spoiler: 'Без спойлера', seats: 'Стандарт', wheels: 'Стандарт', color: 'Оригинальный' })}
                style={{ width: '100%', fontSize: 14 }}>🗑️ Очистить</button>
              <p style={{ color: 'var(--ma-text-muted)', fontSize: 11, marginTop: 10, textAlign: 'center', lineHeight: 1.5 }}>
                JSON-конфигурация будет передана менеджеру
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="ma-card" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>🔧</div>
          <p style={{ color: 'var(--ma-text-muted)' }}>Выберите автомобиль выше, чтобы начать сборку</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// КЛИЕНТЫ
// ============================================================
const CASES = [
  { car: 'Toyota Land Cruiser 200', from: 'Японии', city: 'Новосибирск', days: '24 дня', tuning: 'Лифт-кит +50мм, кенгурятник, защита днища', price: '9 800 000 ₽', img: '🛻' },
  { car: 'Porsche 911 Carrera', from: 'Германии', city: 'Москва', days: '18 дней', tuning: 'Akrapovič, карбоновые вставки, BBS диски', price: '14 200 000 ₽', img: '🏎️' },
  { car: 'BMW M3 Competition', from: 'Германии', city: 'Санкт-Петербург', days: '21 день', tuning: 'Лепестки руля, Recaro, Stage 2 tune', price: '8 400 000 ₽', img: '🚘' },
  { car: 'Lexus LX 570', from: 'ОАЭ', city: 'Краснодар', days: '16 дней', tuning: 'Чёрный глянец, диски WALD R22', price: '11 600 000 ₽', img: '🚙' },
  { car: 'Honda Civic Type R', from: 'Японии', city: 'Екатеринбург', days: '28 дней', tuning: 'Без тюнинга — стандарт', price: '4 100 000 ₽', img: '🚗' },
];
const TOP5 = [
  { name: 'Toyota Land Cruiser', count: 47, img: '🛻' },
  { name: 'BMW X5 / M5', count: 38, img: '🚙' },
  { name: 'Lexus LX / RX', count: 31, img: '🚙' },
  { name: 'Porsche 911', count: 24, img: '🏎️' },
  { name: 'Honda Civic / Type R', count: 19, img: '🚗' },
];

function ClientsPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="ma-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Реальные кейсы</span>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 38, fontWeight: 700, letterSpacing: '0.04em' }}>
          НАШИ <span style={{ color: 'var(--ma-accent)' }}>КЛИЕНТЫ</span>
        </h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 60 }}>
        {CASES.map((c, i) => (
          <div key={i} className="ma-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ fontSize: 40 }}>{c.img}</div>
              <div>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{c.car}</h3>
                <div style={{ color: 'var(--ma-accent)', fontSize: 13 }}>{'⭐'.repeat(5)}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
              {[['Откуда', `из ${c.from}`], ['Доставили в', c.city], ['Срок', c.days], ['Итого', c.price]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--ma-text-muted)' }}>{k}</span>
                  <span style={{ fontWeight: k === 'Итого' ? 700 : 400, color: k === 'Срок' ? 'var(--ma-accent)' : 'var(--ma-text)' }}>{v}</span>
                </div>
              ))}
            </div>
            {!c.tuning.includes('Без тюнинга') && (
              <div style={{ background: 'var(--ma-accent-dim)', border: '1px solid var(--ma-border-accent)', borderRadius: 7, padding: '8px 12px', fontSize: 12, color: 'var(--ma-text-muted)' }}>
                🔧 {c.tuning}
              </div>
            )}
          </div>
        ))}
      </div>
      <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: 20, letterSpacing: '0.04em' }}>
        ТОП-5 <span style={{ color: 'var(--ma-accent)' }}>ЧАСТЫХ АВТО</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TOP5.map((t, i) => (
          <div key={i} className="ma-card" style={{ padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 22, fontWeight: 700, color: i === 0 ? 'var(--ma-accent)' : 'var(--ma-text-muted)', width: 28 }}>#{i + 1}</div>
            <div style={{ fontSize: 26 }}>{t.img}</div>
            <div style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{t.name}</div>
            <div style={{ color: 'var(--ma-text-muted)', fontSize: 13 }}>{t.count} авто</div>
            <div style={{ width: 100 }}>
              <div className="ma-progress"><div className="ma-progress-fill" style={{ width: `${(t.count / TOP5[0].count) * 100}%` }} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// КАК РАБОТАЕТ
// ============================================================
function HowWorksPage() {
  const steps = [
    { n: '01', icon: '🗄️', title: 'Сбор данных', desc: 'Алгоритм анализирует объявления с Авито, Авто.ру и Дром. Проверяем историю ДТП, количество хозяев и юридическую чистоту.', tags: ['Авито 12 000+', 'Авто.ру 8 000+', 'Дром 5 000+'] },
    { n: '02', icon: '🤖', title: 'Оценка ИИ', desc: 'Нейросеть оценивает каждый автомобиль по 47 параметрам: цена, пробег, история ДТП, количество хозяев, рейтинг модели.', tags: ['47 параметров', 'История ДТП', 'Рейтинг надёжности'] },
    { n: '03', icon: '📊', title: 'Индекс выгоды', desc: 'Рассчитываем: надёжность / (|цена − бюджет| + 1). Тюнинг-готовые модели получают бонус +20%.', tags: ['Формула выгоды', '+20% за тюнинг', '+10% за 1 хозяина'] },
    { n: '04', icon: '🏆', title: 'Топ-5 результатов', desc: 'Отбираем 5 лучших, генерируем персональные плюсы/минусы и рассчитываем транспортный налог.', tags: ['3 плюса', '3 минуса', 'Налог л.с.×150₽'] },
  ];
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <span className="ma-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>Технология</span>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 38, fontWeight: 700, letterSpacing: '0.04em' }}>
          КАК РАБОТАЕТ <span style={{ color: 'var(--ma-accent)' }}>MATCHAUTO</span>
        </h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {steps.map((s, i) => (
          <div key={i} className="ma-card" style={{ padding: 36, display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flexShrink: 0, textAlign: 'center' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--ma-accent-dim)', border: '2px solid var(--ma-border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 13, color: 'var(--ma-accent)', fontWeight: 600 }}>ШАГ {s.n}</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: 'var(--ma-text-muted)', lineHeight: 1.7, marginBottom: 14, fontSize: 14 }}>{s.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {s.tags.map((t, ti) => <span key={ti} className="ma-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ma-card" style={{ padding: 36, marginTop: 32, textAlign: 'center', borderColor: 'var(--ma-border-accent)', background: 'var(--ma-accent-dim)' }}>
        <div style={{ color: 'var(--ma-text-muted)', fontSize: 13, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Формула индекса выгоды</div>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(15px, 3vw, 26px)', fontWeight: 600, color: 'var(--ma-accent)', lineHeight: 1.5 }}>
          Index = Надёжность / (|Цена − Бюджет| + 1) × Бонус
        </div>
        <div style={{ color: 'var(--ma-text-muted)', fontSize: 12, marginTop: 10 }}>
          Бонус ×1.2 за тюнинг-готовность · ×1.1 за минимум хозяев
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer style={{ borderTop: '1px solid var(--ma-border)', padding: '40px 24px', marginTop: 60 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 40, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, background: 'var(--ma-accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#000', fontSize: 12 }}>⚡</span></div>
            <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: 17, fontWeight: 700 }}>MATCH<span style={{ color: 'var(--ma-accent)' }}>AUTO</span></span>
          </div>
          <p style={{ color: 'var(--ma-text-muted)', fontSize: 13, maxWidth: 220, lineHeight: 1.6 }}>ИИ-подбор, привоз и тюнинг автомобилей под ваш бюджет</p>
        </div>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 13 }}>Сервисы</div>
            {[['home', 'Подбор авто'], ['tuning', 'Тюнинг'], ['clients', 'Клиенты'], ['howworks', 'Как работает']].map(([p, l]) => (
              <button key={p} onClick={() => go(p as Page)} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ma-text-muted)', fontSize: 13, marginBottom: 7, fontFamily: 'Golos Text, sans-serif', padding: 0 }}>{l}</button>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 13 }}>Контакты</div>
            <p style={{ color: 'var(--ma-text-muted)', fontSize: 13, lineHeight: 1.9 }}>📞 +7 (800) 555-00-00<br />✉️ hello@matchauto.ru<br />📍 Москва</p>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '20px auto 0', paddingTop: 20, borderTop: '1px solid var(--ma-border)', display: 'flex', justifyContent: 'space-between', color: 'var(--ma-text-muted)', fontSize: 12, flexWrap: 'wrap', gap: 6 }}>
        <span>© 2024 MatchAuto</span><span>ИИ-подбор · Привоз · Тюнинг · Доставка</span>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [results, setResults] = useState<CarResult[]>([]);
  const [tuningCar, setTuningCar] = useState<CarData | null>(null);

  useEffect(() => {
    const s = sessionStorage.getItem('matchauto_results');
    if (s) { try { setResults(JSON.parse(s)); } catch { /* ignore */ } }
  }, []);

  function go(p: Page) { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  function handleResults(r: CarResult[]) { setResults(r); go('results'); }
  function handleTuning(c: CarData) { setTuningCar(c); go('tuning'); }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ma-bg)' }}>
      <Nav current={page} go={go} />
      <main>
        {page === 'home' && <HomePage onResults={handleResults} />}
        {page === 'results' && <ResultsPage results={results} onTuning={handleTuning} onBack={() => go('home')} />}
        {page === 'tuning' && <TuningPage initCar={tuningCar} onCarSelect={setTuningCar} />}
        {page === 'clients' && <ClientsPage />}
        {page === 'howworks' && <HowWorksPage />}
      </main>
      <Footer go={go} />
    </div>
  );
}
