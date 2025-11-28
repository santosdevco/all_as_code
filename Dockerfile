FROM python:3.11-slim AS builder

# Create working dir for wheels
WORKDIR /wheels

# Copy only requirements to cache wheel building
COPY requirements.txt /wheels/requirements.txt

# Upgrade pip and build wheels for all requirements (cached in /wheels)
RUN pip install --upgrade pip setuptools wheel \
	&& pip wheel --wheel-dir /wheels -r /wheels/requirements.txt \
	&& apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

FROM python:3.11-slim

# Prevent Python from buffering stdout/stderr
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copy wheels from builder and requirements
COPY --from=builder /wheels /wheels
COPY requirements.txt /app/requirements.txt

# Install from wheels (fast, cached)
RUN pip install --no-cache-dir --no-index --find-links /wheels -r /app/requirements.txt

# Copy project files
COPY . /app

# Expose default mkdocs port
EXPOSE 8000

# Run mkdocs server with livereload on all interfaces
CMD ["mkdocs", "serve", "--dev-addr=0.0.0.0:8000", "--livereload"]
