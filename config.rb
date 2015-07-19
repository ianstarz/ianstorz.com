###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"

  blog.permalink = "{year}/{month}/{day}/{title}.html"
  # Matcher for blog source files
  blog.sources = "{year}-{month}-{day}-{title}/index.html"
  blog.taglink = "tags/{tag}.html"
  blog.layout = "blog/layout"
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250
  blog.year_link = "{year}.html"
  blog.month_link = "{year}/{month}.html"
  blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".md.erb"

  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

page "/feed.xml", layout: false
ignore "/blog/layout.erb"

# Syntax highlighting
set :markdown_engine, :kramdown
activate :syntax, line_numbers: true

# Used for building the canonical link tag
set :preferred_origin, 'https://ianstorz.com'

# Used for generating absolute URLs
set :protocol, "https://"
set :host, "ianstorz.com"
set :port, 80

configure :development do
  # Used for generating absolute URLs
  if Middleman.constants.include?(:PreviewServer)
    set :protocol, "http://"
    set :host, Middleman::PreviewServer.host
    set :port, Middleman::PreviewServer.port
  end

  activate :livereload
end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # Pretty URLs (directory indexes)
  activate :directory_indexes

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

# Middleman s3_sync gem config
activate :s3_sync do |s3_sync|
  s3_sync.bucket = 'ianstorz-com'
  s3_sync.region = 'us-west-2'
end
