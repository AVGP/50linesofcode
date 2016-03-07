{
  "title": "Writing Heroku CLI plugins",
  "date": "2015-03-09 13:00:14 GMT"
}

---

#Writing Heroku CLI plugins
Heroku's toolbelt is great. It allows you to access all of Herokus important features conveniently from the command line.

But there may be situations where you would like to use the toolbelt but can't, because it doesn't have the desired feature.

That's where the plugins come into play.

## Plugins?

The toolbelt has a plugin architecture which allows you to install plugins via

    $ heroku plugins:install <Git URL>
for example:

    $ heroku plugins:install https://github.com/AVGP/heroku-build.git

The plugins will then behave exactly like built-in commands, for instance:

    $ heroku build deploy.tar.gz v1.2.3
The `heroku build` command does not exist in the toolbelt itself, but in a plugin.

## Our first plugin: Hello World

Medias in res - let's build a simple plugin that outputs the infamous "Hello World!" when we run `heroku hello` in a terminal.

First of all, we need to create a new directory with a Ruby file (convention seems to be `init.rb` as the file name).

The content of our plugin looks like this:

    require 'heroku/command/base'
    
    class Heroku::Command::Hello < Heroku::Command::Base
      def index
        display "Hello World!"
      end
    end

There's not much going on so far:

1. We include the Heroku Command namespace
2. We create a new class `Hello` within that namespace
3. We inherit from `Heroku::Command:Base` for that class
4. We have a `index` method that `display`s the words "Hello World"

Cool. Now we can put it on Github and run

    heroku plugins:install https://github.com/YOUR_USERNAME/YOUR_REPO.git
  
and then

    $ heroku hello
    Hello World
    $
Yay!

Okay, but that isn't terribly useful so far. Let's do something for real!

# A real plugin: List Dynos for an application

Now we want to use our newly-gained plugin developer skills to build a plugin that lists the state ("up" or "idle"), name (e.g. "web.1") and application version for each [Dyno](https://devcenter.heroku.com/articles/dynos) of a given app.

So we'll be doing this:

1. Create a new "heroku-dynos" plugin
2. Have it carry out an API call to the `/dynos` endpoint (with authentication)
3. List the dynos of the given application with name, state and code version

To begin, create a new directory `heroku-dynos` with a fresh, empty `init.rb`. We'll use that as our clean slate for the new plugin.

First of all, we need to inherit from `Heroku::Command::BaseWithApp` to get the `app` variable that is either the name of the current application we're in or uses the `--app` (or `-a` for short) parameter to set that name manually.

Let's start with the - adjusted - basics:

    require 'heroku/command/base'
    
    class Heroku::Command::Dynos < Heroku::Command::BaseWithApp
      def index
        display "Hello #{app}!"
      end
    end

Notice the *2* changes we've made? Good. Try running it from the directory of a Heroku application or use

    $ heroku dynos -a <Name>

Great. Now on to using the [Heroku Platform API](https://devcenter.heroku.com/articles/platform-api-reference) that has an endpoint to [get all the Dynos for an application](https://devcenter.heroku.com/articles/platform-api-reference#dyno-list). Cool.

So we'll need to fetch the list of Dynos via HTTP and parse the JSON response. We create a `make_api_request` method for that:

    require 'heroku/command/base'
    
    class Heroku::Command::Dynos < Heroku::Command::BaseWithApp
      def index
        display "Dynos for #{app}..."
      end
    
      private
    
      def make_api_request(url)
        url = URI.parse(url)
    
        req = Net::HTTP::Get.new(url.request_uri)
        req.add_field("Accept", "application/vnd.heroku+json; version=3")
        req.add_field("Authorization", "Bearer #{Heroku::Auth.password}")

        res = Net::HTTP.start(url.host, url.port, nil, nil, nil, nil, {use_ssl: true}) { |http|
          http.request(req)
        }
    
        JSON.parse(res.body)
      end

The new method does not only contain the HTTP request for the API but also another handy detail: `Heroku::Auth.password` gives us access to the API token that is needed to carry out authenticated API calls.

Now we'll write one more method that actually calls the `make_api_request` method and displays the Dynos as we wanted - with name, status and version of the code they run:

    require 'heroku/command/base'
    
    class Heroku::Command::Dynos < Heroku::Command::BaseWithApp
      def index
        display "Dynos for #{app}..."
        list_dynos_for(app)
      end
    
      private
    
      def make_api_request(url)
        url = URI.parse(url)
    
        req = Net::HTTP::Get.new(url.request_uri)
        req.add_field("Accept", "application/vnd.heroku+json; version=3")
        req.add_field("Authorization", "Bearer #{Heroku::Auth.password}")
    
        res = Net::HTTP.start(url.host, url.port, nil, nil, nil, nil, {use_ssl: true}) { |http|
          http.request(req)
        }
    
        JSON.parse(res.body)
      end
    
      def list_dynos_for(app)
        dynos = make_api_request("https://api.heroku.com/apps/#{app}/dynos")
        dynos.each do |dyno|
          name    = dyno["name"]
          state   = dyno["state"]
          version = if dyno["release"].nil?
            "unkown"
          else
            dyno["release"]["version"].to_s
          end
    
          display "#{name} is #{state} and running version #{version}"
        end
      end
    end

And with that, we have a fresh plugin that gives us a list of the dynos for any of our applications on Heroku:

    $ heroku dynos -a some-app
    Dynos for some-app...
    web.1 is up and running version 6
    web.2 is up and running version 6

Have fun and I'm looking forward to the plugins you create with this! :)