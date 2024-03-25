import { nextTick } from 'vue';
import { useLocalStorage } from '../useLocalStorage';
import {describe, expect, it} from 'vitest'

describe('useLocalStorage', () => {
  describe('for primitive values', () => {
    it('should return the default value if the key does not exist', () => {
      // Arrange
      const defaultValue = 42;
      const key = 'key-A-1';

      // Act
      const value = useLocalStorage(key, defaultValue);

      // Assert
      expect(value.value).toBe(defaultValue);
    });

    it('should return the stored value if the key exists', () => {
      // Arrange
      const storedValue = 43;
      const key = 'key-A-2';
      localStorage.setItem(key, JSON.stringify(storedValue));

      // Act
      const value = useLocalStorage(key, 42);

      // Assert
      expect(value.value).toBe(storedValue);
    });

    it('should store the value in localStorage', async () => {
      // Arrange
      const newValue = 44;
      const key = 'key-A-3';
      const value = useLocalStorage(key, 42);

      // Act
      value.value = newValue;
      await nextTick(); // Wait for the watcher to update the localStorage

      // Assert
      expect(JSON.parse(localStorage.getItem(key)!)).toBe(newValue);
    });
  });

  describe('for object values', () => {
    it('should return the default value if the key does not exist', () => {
      // Arrange
      const defaultValue = { a: 42, b: 'foo' };
      const key = 'key-B-1';

      // Act
      const value = useLocalStorage(key, defaultValue);

      // Assert
      expect(value.value).toEqual(defaultValue);
    });

    it('should return the stored value if the key exists', () => {
      // Arrange
      const storedValue = { a: 43, b: 'bar' };
      const key = 'key-B-2';
      localStorage.setItem(key, JSON.stringify(storedValue));

      // Act
      const value = useLocalStorage(key, { a: 42, b: 'foo' });

      // Assert
      expect(value.value).toEqual(storedValue);
    });

    it('should store the value in localStorage', async () => {
      // Arrange
      const newValue = { a: 44, b: 'baz' };
      const key = 'key-B-3';
      const value = useLocalStorage(key, { a: 42, b: 'foo' });

      // Act
      value.value = newValue;
      await nextTick(); // Wait for the watcher to update the localStorage

      // Assert
      expect(JSON.parse(localStorage.getItem(key)!)).toEqual(newValue);
    });
  });

  describe('for array values', () => {
    it('should return the default value if the key does not exist', () => {
      // Arrange
      const defaultValue = [42, 43];
      const key = 'key-C-1';

      // Act
      const value = useLocalStorage(key, defaultValue);

      // Assert
      expect(value.value).toEqual(defaultValue);
    });

    it('should return the stored value if the key exists', () => {
      // Arrange
      const storedValue = [43, 44];
      const key = 'key-C-2';
      localStorage.setItem(key, JSON.stringify(storedValue));

      // Act
      const value = useLocalStorage(key, [42, 43]);

      // Assert
      expect(value.value).toEqual(storedValue);
    });

    it('should store the value in localStorage', async () => {
      // Arrange
      const newValue = [44, 45];
      const key = 'key-C-3';
      const value = useLocalStorage(key, [42, 43]);

      // Act
      value.value = newValue;
      await nextTick(); // Wait for the watcher to update the localStorage

      // Assert
      expect(JSON.parse(localStorage.getItem(key)!)).toEqual(newValue);
    });
  });
});
