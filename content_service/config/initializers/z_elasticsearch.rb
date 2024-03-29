# # # # # config/initializers/elasticsearch.rb

# # # # # Configure Elasticsearch client
# # # # Elasticsearch::Model.client = Elasticsearch::Client.new(url: ENV['ELASTICSEARCH_URL'])

# # # # config/initializers/elasticsearch.rb
# # # require 'elasticsearch/model'

# # # Elasticsearch::Model.client = Elasticsearch::Client.new(url: ENV['ELASTICSEARCH_URL'])

# # # # Ensure the posts index exists
# # # unless Post.__elasticsearch__.index_exists?
# # #   Post.__elasticsearch__.create_index!(force: true)
# # # end

# # # config/initializers/elasticsearch.rb
# # require 'elasticsearch/model'

# # # Require the Post model
# # require_relative '../models/post'

# # # Configure Elasticsearch client
# # Elasticsearch::Model.client = Elasticsearch::Client.new(url: ENV['ELASTICSEARCH_URL'])

# # # Ensure the posts index exists
# # unless Post.__elasticsearch__.index_exists?
# #   Post.__elasticsearch__.create_index!(force: true)
# # end


# # config/initializers/elasticsearch.rb

# require 'elasticsearch/model'

# # Explicitly require the Post model
# require_relative '../../app/models/post'


# # Configure Elasticsearch client
# Elasticsearch::Model.client = Elasticsearch::Client.new(url: ENV['ELASTICSEARCH_URL'])

# # Ensure the posts index exists
# unless Post.__elasticsearch__.index_exists?
#   Post.__elasticsearch__.create_index!(force: true)
# end
