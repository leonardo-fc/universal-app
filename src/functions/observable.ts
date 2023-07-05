export class Observable<T> implements AsyncIterable<T> {
  private resolve: ((value: IteratorResult<T, T>) => void) | undefined;
  private promise = this.createPromise();
  private createPromise() {
    return new Promise<IteratorResult<T>>((resolve) => {
      this.resolve = resolve;
    });
  }

  next(value: T) {
    this.resolve?.({ value });
    this.promise = this.createPromise();
  }

  final(value: T) {
    this.resolve?.({ value, done: true });
  }

  [Symbol.asyncIterator]() {
    return { next: () => this.promise };
  }
}
