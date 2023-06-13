class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'size'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering: Keep this in mind to filter clock in and clock out based on a particulat date range
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // query = query.sort(req.query.sort); incase there is only one parameter you want to sort by
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitField() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const size = this.queryString.size * 1 || 10;
    const skip = (page - 1) * size;
    this.query = this.query.skip(skip).limit(size);
    return this;
  }
}

module.exports = APIFeatures;
