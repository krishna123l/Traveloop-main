class APIfectures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    // excluding some particular terms
    const excludeKeys = ['page', 'sortBy', 'order', 'fields', 'limit'];
    excludeKeys.forEach((el) => delete queryObj[el]);

    // advanced options applying the gt,lt,gte,lte
    let QueryString = JSON.stringify(queryObj);
    QueryString = QueryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );

    // getting an excepted Data after filtering
    this.query = this.query.find(JSON.parse(QueryString));

    return this;
  }

  sorting() {
    if (this.queryString.sortBy) {
      const sortingFields = this.queryString.sortBy.split(',').join(' ');
      this.query = this.query.sort(sortingFields);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limiting() {
    if (this.queryString.fields) {
      const selectBy = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(selectBy);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 3;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIfectures;
