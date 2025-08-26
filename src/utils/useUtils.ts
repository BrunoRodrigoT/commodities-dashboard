import { useCallback } from 'react';
import { formatDuration, parseISO, intervalToDuration, Duration } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const useUtils = () => {
  const numberToRem = useCallback((number: number = 0): number => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const { fontSize } = window.getComputedStyle(document.body);
      const px = Number(fontSize.replace('px', ''));
      const rem = number * px;
      return rem;
    }
    return 0;
  }, []);

  const limitName = useCallback((name: string | undefined, limit: number = 2): string => {
    if (!name) return ' ';
    const splitedName = name.split(' ');
    const limitedName = splitedName.filter((_, i) => i <= limit - 1).join(' ');
    return limitedName;
  }, []);

  const convertDateTobirthday = useCallback(
    (
      dateToConvert: string,
      unities: Array<keyof Duration> = ['years', 'months', 'days'],
      delimiter: string = ', ',
      abreviation: boolean = false,
    ): string => {
      if (!dateToConvert) return ' ';
      const duration = intervalToDuration({
        start: parseISO(dateToConvert),
        end: new Date(),
      });

      const filteredDuration: Partial<Duration> = {};
      unities.forEach((unit) => {
        filteredDuration[unit] = duration[unit];
      });

      const formattedDate = formatDuration(filteredDuration, {
        delimiter,
        locale: ptBR,
      });

      if (abreviation) {
        return formattedDate.split(delimiter).reduce((acc, current, index, array) => {
          const [number, name] = current.split(' ');
          const newValue = `${number}${name?.slice(0, 1)}${index === array.length - 1 ? '' : delimiter}`;
          return acc + newValue;
        }, '');
      }
      return formattedDate;
    },
    [],
  );

  const mediumOfTimes = useCallback(
    (times: string[]): { hours: string; minutes: string; seconds: string } => {
      const secondsTimes = times.map((time) => {
        const splitTime = time.split(':');
        const secondsTime =
          parseInt(splitTime[0], 10) * 3600 +
          parseInt(splitTime[1], 10) * 60 +
          parseInt(splitTime[2], 10);
        return secondsTime;
      });

      const fullTime = secondsTimes.reduce((acc, secondsTime) => acc + secondsTime, 0);
      const media = fullTime / times.length;
      const mediumTime = new Date(media * 1000).toISOString().substr(11, 8);
      const splitMediumTime = mediumTime.split(':');

      return {
        hours: splitMediumTime[0],
        minutes: splitMediumTime[1],
        seconds: splitMediumTime[2],
      };
    },
    [],
  );

  const calcPercent = useCallback((small: number, larger: number): number => {
    if (small > 0) {
      return Math.round((small / larger) * 100);
    }
    return 0;
  }, []);

  const getPageDimensions = useCallback((): DOMRect => {
    if (typeof document !== 'undefined') {
      const { body } = document;
      const dimensions = body.getBoundingClientRect();
      return dimensions;
    }
    return new DOMRect(0, 0, 0, 0);
  }, []);

  return {
    numberToRem,
    limitName,
    convertDateTobirthday,
    mediumOfTimes,
    calcPercent,
    getPageDimensions,
  };
};

export default useUtils;
