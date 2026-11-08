const Joi = require('joi');

module.exports.listingSchema = joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required,
        location: Joi.string().required,
        price: Joi.string().required,
        image: Joi.string().required,
        
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rationg:Joi.number().required(),
        comment:Joi.string().required()
    }).required()
})




       /* <% if(!currUser.user) { %>
          <a class="nav-link active" aria-current="page" href="/login">login</a>
        
          <a class="nav-link" href="/signup">signup</a>
      <%  } %>

      <% if(currUser.user) { %>
          <a class="nav-link" href="/logout">logout</a>
        <%  } %>*/